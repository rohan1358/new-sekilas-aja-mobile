import firestore from "@react-native-firebase/firestore";
import { encode } from "base-64";
export const firebaseTrackPayment = (data: any) => {
  firestore()
    .collection("dashboard")
    .doc("track_record")
    .set(
      {
        payment: {
          [data.date.getTime()]: data
        }
      },
      { merge: true }
    );
};
export const getInvoices = (id: any) => {
  const key_testing =
      "xnd_development_HWcWLqDSdSs46onUwVyjQs6CcDTShU1EmYF16XRZLgZPwImUdFK6OVKzfBPc4i",
    key_real =
      "xnd_production_6WMWIlyfrTmMN5Nyl5jaf1Yb1gZOFw0NnU2MFFFMJFp9UsmU0QXUTF4VM5uJp94l";

  return new Promise((resolve, reject) => {
    fetch(
      `https://us-central1-sekilasaja-999fd.cloudfunctions.net/widgets/get-invoices/${id}`,
      {
        headers: {
          Authorization: "Basic " + encode(key_real + ":" + "")
        }
      }
    )
      .then((response) => response.json())
      .then((data) =>
        resolve({
          data: data,
          isSuccess: typeof data.status === "string" ? true : false
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
};
