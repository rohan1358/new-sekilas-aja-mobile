import firestore from "@react-native-firebase/firestore";

const fireShorts = firestore().collection("myShorts");
export const checkSavedShorts = (body?: any) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("myShorts")
      .doc(body)
      .get()
      .then((res) => {
        if (res.data()) {
          reject(false);
        } else {
          resolve(true);
        }
      });
  });
};

export const fetchMyShorts = (idUser?: any) => {
  return new Promise((resolve, reject) => {
    try {
      // const groups = data.reduce((groups: any, shorts: any) => {
      //   const books = shorts.shorts_books;
      //   if (!groups[books]) {
      //     groups[books] = [];
      //   }
      //   groups[books].push(shorts);
      //   return groups;
      // }, {});

      // const groupArrays = Object.keys(groups).map((books: any) => {
      //   console.log("books", books);
      //   let is_shorts = groups[books].map((cb: any) => {
      //     return cb.id_shorts;
      //   });
      //   return {
      //     books,
      //     is_shorts,
      //     shorts: groups[books]
      //   };
      // });

      // console.log("groupArrays", JSON.stringify(groupArrays), "groups", groups);

      const newGroupArrays = (data: any) => {
        return new Promise((resolve) => {
          let results = Object.keys(data).map((books: any) => {
            let id_shorts = data[books].map((cb: any) => {
              return cb.id_shorts;
            });
            return {
              books,
              id_shorts,
              shorts: data[books],
              shorts_cover: data[books][0]["shorts_cover"]
            };
          });
          resolve(results);
        });
      };

      const newGroupingBook = (data: any) => {
        return new Promise((resolve) => {
          const groups = data.reduce((groups: any, shorts: any) => {
            const books = shorts.shorts_books;
            if (!groups[books]) {
              groups[books] = [];
            }
            groups[books].push(shorts);
            return groups;
          }, {});
          resolve(groups);
        });
      };

      fireShorts
        .where("user", "==", idUser)
        .get()
        .then((res) => {
          const results = res.docs.map((cb) => {
            return {
              ...cb.data(),
              id: cb.id
            };
          });
          newGroupingBook(results).then((res) => {
            newGroupArrays(res).then(async (cbGa) => {
              if (Array.isArray(cbGa)) {
                const resultsPromise = await Promise.all(
                  cbGa.map(async (data) => {
                    const shortList = await firestore()
                      .collection("books")
                      .doc(data.books)
                      .collection("shorts")
                      .where("kilas", "in", data.id_shorts)
                      .get()
                      .then((myShort: any) => {
                        const results = myShort.docs.map((cb: any) => {
                          return {
                            ...cb.data(),
                            id: cb.id
                          };
                        });

                        return results;
                      });

                    const results = {
                      book_title: data.books,
                      shorts: shortList,
                      book_cover: data.shorts_cover,
                      id: data.books
                    };

                    return results;
                  })
                );

                resolve(resultsPromise);
              }
            });
          });
        });
    } catch {}
  });
};

export const fireSaveShorts = (route?: any, body?: any) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("myShorts")
      .doc(route)
      .set(body)
      .then((res) => {
        resolve(true);
      });
  });
};

export const fireRemoveShorts = (route?: any) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("myShorts")
      .doc(route)
      .delete()
      .then((res) => {
        resolve(true);
      });
  });
};
