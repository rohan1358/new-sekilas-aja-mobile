import { Check, Download, Heart, Search } from "@assets";
import { Base, Button, Gap, LibraryMenu, TextItem } from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/reducers";
import { fetchFavoriteBooks } from "../../services";
import styles from "./styles";

const Library = (navigation : any) => {

  const [favorit, setFavorit] = React.useState(0)

  const {
     sessionReducer : {email,  }
  } = useSelector((state: ReduxState) => state);

  React.useEffect(() => {
 async function getTotalFavorit (){
  const total = await fetchFavoriteBooks(email)
if(total){
  setFavorit(total.jumlah)
} 
} 
getTotalFavorit()
  }, [])

  return (
    <Base barColor={primaryColor.main}>
      <View style={styles.headerContainer}>
        <Gap vertical={sp.sm} />
        <View style={styles.headerTitle}>
          <TextItem type="b.24.nc.90">Koleksi Bukuku</TextItem>
          <Button style={styles.icon}>
            <Search stroke={neutralColor[90]} />
          </Button>
        </View>
        <Gap vertical={sp.sm} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <LibraryMenu
        action={() => console.log('masuk ke page buku yang di unduh')}

          title={strings.downloadedBooks}
          bookCount={5}
          icon={<Download stroke={neutralColor[90]} />}
        />
        <Gap vertical={sp.sm} />
        <LibraryMenu
        action={() => navigation.navigation.navigate("MyFavorite", {
          type: "myFavorite",
        })}
          title={strings.favBooks}
          bookCount={favorit}
          icon={<Heart stroke={neutralColor[90]} width={24} height={24} />}
        />
        <Gap vertical={sp.sm} />
        <LibraryMenu
        action={() => console.log('masuk ke page buku yang telah selesai di baca')}

          title={strings.finishedBooks}
          bookCount={17}
          icon={<Check stroke={neutralColor[90]} />}
        />
      </ScrollView>
    </Base>
  );
};

export default Library;
