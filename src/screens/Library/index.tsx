import { Bookmark, Check, Download, Heart, Search } from "@assets";
import { Base, Button, Gap, LibraryMenu, TextItem } from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { logger } from "../../helpers";
import { ReduxState } from "../../redux/reducers";
import {
  fetchFavoriteBooks,
  fetchMyShorts,
  getAllProgress,
  getTotalFinishingRead
} from "../../services";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

const Library = (navigation: any) => {
  const [favorit, setFavorit] = React.useState(0);
  const [totalReading, setTotalReading] = React.useState(0);
  const [totalProgress, setTotalProgress] = React.useState(0);
  const [totalShorts, setTotalShorts] = React.useState(0);

  const {
    sessionReducer: { email },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const getTotalFavorit = async () => {
    try {
      const total = await fetchFavoriteBooks(email);
      setFavorit(total?.jumlah);
    } catch (e) {
      setFavorit(0);

      // Handle error
    }
  };

  const getTotalShorts = () => {
    fetchMyShorts(profile.id).then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        setTotalShorts(res.length);
      }
    });
  };

  useEffect(() => {
    getTotalShorts();
    getTotalFavorit();
    getAllProgress(profile.id).then((res: any) => {
      setTotalProgress(res.data.length);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const getTotalFavorit = async () => {
        try {
          const total = await fetchFavoriteBooks(email);
          const totalDoneReading = await getTotalFinishingRead(email);

          if (isActive) {
            setFavorit(total?.jumlah);
            setTotalReading(totalDoneReading);
          }
        } catch (e) {
          // Handle error
        }
      };

      getTotalFavorit();

      return () => {
        getTotalFavorit();
        isActive = false;
      };
    }, [])
  );

  return (
    <Base barColor={primaryColor.main}>
      <View style={styles.headerContainer}>
        <Gap vertical={sp.sm} />
        <View style={styles.headerTitle}>
          <TextItem type="b.24.nc.90">Koleksi Bukuku</TextItem>
          {/* <Button style={styles.icon}>
            <Search stroke={neutralColor[90]} />
          </Button> */}
        </View>
        <Gap vertical={sp.sm} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* <LibraryMenu
          action={() => logger("masuk ke page buku yang di unduh")}
          title={strings.downloadedBooks}
          bookCount={5}
          icon={<Download stroke={neutralColor[90]} />}
        />
        <Gap vertical={sp.sm} /> */}
        <LibraryMenu
          action={() =>
            navigation.navigation.navigate("SpecialBookList", {
              type: "myFavorite"
            })
          }
          title={strings.favBooks}
          bookCount={favorit}
          icon={<Bookmark stroke={neutralColor[90]} width={24} height={24} />}
        />
        <Gap vertical={sp.sm} />
        <LibraryMenu
          action={() =>
            navigation.navigation.navigate("SpecialBookList", {
              type: "doneReading"
            })
          }
          title={strings.finishedBooks}
          bookCount={totalReading}
          icon={<Check stroke={neutralColor[90]} />}
        />
        <Gap vertical={sp.sm} />

        <LibraryMenu
          action={() =>
            navigation.navigation.navigate("MyShortsList", {
              type: "doneReading"
            })
          }
          title={"Shortsku"}
          bookCount={totalShorts}
          icon={<Check stroke={neutralColor[90]} />}
        />
        <Gap vertical={sp.sm} />

        <LibraryMenu
          action={() =>
            navigation.navigation.navigate("BookListHistoryBrowsing", {
              type: "doneReading"
            })
          }
          title={"Riwayat Jelajah Buku"}
          bookCount={totalProgress}
          icon={<Check stroke={neutralColor[90]} />}
        />
      </ScrollView>
    </Base>
  );
};

export default Library;
