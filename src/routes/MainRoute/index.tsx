import { createNativeStackNavigator as createStackNavigator } from "@react-navigation/native-stack";
import { ReduxState } from "@rux";
import React, { useState } from "react";
import { OrientationLocker, PORTRAIT } from "react-native-orientation-locker";
import { encode } from "base-64";

import { useSelector } from "react-redux";
import {
  About,
  AccountSettings,
  BookDetail,
  BookTableContent,
  Category,
  Home,
  Listening,
  Notification,
  NotifSettings,
  PageEditProfile,
  Profile,
  Reading,
  Search,
  SignIn,
  SpecialBookList,
  Subscribe,
  Watching,
  ContentNotification,
  Explore,
  Mentoring,
  RewatchWebinar,
  Blog,
  ReadingBlog,
  Challenge,
  ListBookChallenge,
  ModalSubscribe,
  MyShortsList,
  BookListHistoryBrowsing
} from "../../screens";
import { RootStackParamList } from "../../types";
import MainBottomRoute from "../MainBottomRoute";
import firestore from "@react-native-firebase/firestore";
import { updateUser } from "@services";
import { firebaseTrackPayment, getInvoices } from "../../services/payment";
import { firebaseNode } from "@constants";
import { FloatingMedia, FloatingMentoring, FloatingVideo } from "@atom";

const Stack = createStackNavigator<RootStackParamList>();

const MainRoute = () => {
  const {
    editProfile: { profile },
    mainContext: { modalSubscribeRedux },
    audioRedux: { audio_exist },
    videoRedux: { video_exist }
  } = useSelector((state: ReduxState) => state);

  const [isFirstTime, setFirstTime] = useState(false);

  React.useEffect(() => {
    if (!isFirstTime) {
      setFirstTime(true);
    }
  }, []);

  React.useEffect(() => {
    firestore()
      .collection(firebaseNode.users)
      .doc(profile.id)
      .onSnapshot((res: any) => {
        if (res.data() && res.data().id_incoive) {
          const { email, phoneNumber, promo_code_invoice, promo_codes_used } =
            res.data();
          // get invoices
          const start_date = new Date();

          let end_date = new Date();

          const userPromoCodes = promo_code_invoice
            ? [...promo_codes_used, promo_code_invoice]
            : promo_codes_used;

          getInvoices(res.data().id_incoive).then((res: any) => {
            const { data, isSuccess } = res;
            if (data.status !== "PENDING" && isSuccess) {
              if (data.description == "Subscription 12 Bulan") {
                end_date.setMonth(end_date.getMonth() + 12);
              } else if (data.description == "Subscription 3 Bulan") {
                end_date.setMonth(end_date.getMonth() + 3);
              } else if (data.description == "Subscription 1 Bulan") {
                end_date.setMonth(end_date.getMonth() + 1);
              }
              firebaseTrackPayment({
                email,
                date: new Date(),
                phoneNumber: phoneNumber,
                item: data.description,
                kode_promo: promo_code_invoice
              });
              updateUser(email, {
                is_subscribed: true,
                end_date: end_date,
                start_date: start_date,
                id_incoive: "",
                promo_codes_used: userPromoCodes,
                promo_code_invoice: ""
              }).then((res) => {});
            }
          });
        }
      });
  }, []);

  return (
    <>
      <ModalSubscribe modalVisible={modalSubscribeRedux} />
      {/* <OrientationLocker orientation={PORTRAIT} /> */}
      <Stack.Navigator
        initialRouteName={"MainBottomRoute"}
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        <Stack.Screen
          name={"Home"}
          component={!isFirstTime ? Home : MainBottomRoute}
          // component={Home}
        />
        <Stack.Screen
          name={"BookListHistoryBrowsing"}
          component={BookListHistoryBrowsing}
          // component={Home}
        />

        <Stack.Screen
          name={"MyShortsList"}
          component={MyShortsList}
          // component={Home}
        />

        <Stack.Screen
          name={"Challenge"}
          component={Challenge}
          // component={Home}
        />

        <Stack.Screen
          name={"ListBookChallenge"}
          component={ListBookChallenge}
          // component={Home}
        />

        <Stack.Screen
          name={"Blog"}
          component={Blog}
          // component={Home}
        />

        <Stack.Screen
          name={"ReadBlog"}
          component={ReadingBlog}
          // component={Home}
        />

        <Stack.Screen
          name={"RewatchWebinar"}
          component={RewatchWebinar}
          // component={Home}
        />

        <Stack.Screen
          name={"Mentoring"}
          component={Mentoring}
          // component={Home}
        />
        {/* <Stack.Screen
        name={"Explore"}
        component={!isFirstTime ? Explore : MainBottomRoute}
      /> */}
        <Stack.Screen name={"SignIn"} component={SignIn} />

        {profile && (
          <Stack.Screen name={"MainBottomRoute"} component={MainBottomRoute} />
        )}

        <Stack.Screen name={"About"} component={About} />
        <Stack.Screen
          name={"ContentNotification"}
          component={ContentNotification}
          options={{
            animation: "slide_from_right"
          }}
        />
        <Stack.Screen name={"AccountSettings"} component={AccountSettings} />
        <Stack.Screen name={"Category"} component={Category} />
        <Stack.Screen
          name={"NotifSettings"}
          options={{
            animation: "slide_from_right"
          }}
          component={NotifSettings}
        />
        <Stack.Screen name={"PageEditProfile"} component={PageEditProfile} />
        <Stack.Screen name={"Profile"} component={Profile} />
        <Stack.Screen name={"Search"} component={Search} />
        <Stack.Screen name={"Notification"} component={Notification} />
        <Stack.Screen name={"BookDetail"} component={BookDetail} />
        <Stack.Screen name={"Reading"} component={Reading} />
        <Stack.Screen name={"BookTableContent"} component={BookTableContent} />
        <Stack.Screen name={"Listening"} component={Listening} />
        <Stack.Screen name={"Watching"} component={Watching} />
        <Stack.Screen name={"Subscribe"} component={Subscribe} />
        <Stack.Screen name={"SpecialBookList"} component={SpecialBookList} />
      </Stack.Navigator>
      {video_exist ? (
        <FloatingVideo />
      ) : audio_exist ? (
        <FloatingMedia />
      ) : (
        <FloatingMentoring />
      )}
    </>
  );
};

export default MainRoute;
