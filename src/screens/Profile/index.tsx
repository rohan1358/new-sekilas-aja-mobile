import {
  Base,
  Button,
  DummyFlatList,
  ProfileHeader,
  TextItem
} from "../../components";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import {
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  strings
} from "@constants";
import styles from "./styles";
import { AlertModal, ChevronRight, EditGray } from "@assets";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../redux/reducers";
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { loggingIn, setProfileRedux } from "../../redux/actions";
import { CommonActions } from "@react-navigation/routers";
import { SnackStateProps } from "../../components/atom/Base/types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { logger } from "../../helpers";

export default function Profile({ navigation }: any) {
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [modalAlert, setModalAlert] = useState<boolean>(false);
  const [textAlert, setTextAlert] = useState({
    text: "",
    action: "",
    button: ""
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleUpdateImage = (image: string) => {
    const user = auth().currentUser;
    // logger(image)
    user
      ?.updateProfile({
        photoURL: "image"
      })
      .then(() => {
        setSnackState(ss.successState(strings.success));
      })
      .catch((err) => {
        logger("Profile", "Filed update photoUrl");
        setSnackState(ss.successState(err));
      })
      .finally(() => {
        setImageUrl(image);
        refRBSheet.current.close();
      });
  };

  const handleImagePicker = (type: string) => {
    if (type == "camera") {
      launchCamera(
        {
          mediaType: "photo",
          quality: 1,
          saveToPhotos: true,
          maxHeight: 500,
          maxWidth: 500,
          includeBase64: true
        },
        (callback) => {
          if (callback.errorCode === "camera_unavailable") {
            setSnackState(ss.failState(strings.camera_unavailable));
            return;
          } else if (callback.errorCode === "permission") {
            setSnackState(ss.failState(strings.permission));
            return;
          } else if (callback.errorCode === "others") {
            setSnackState(ss.failState(strings.other));
            return;
          } else if (callback.didCancel) {
            logger("camera cancel");
          } else {
            const base64 = {
              uri: "data:image/jpeg;base64," + callback.assets[0].base64
            };
            handleUpdateImage(base64.uri);
          }
        }
      );
    } else {
      launchImageLibrary(
        {
          mediaType: "photo",
          quality: 1,
          maxHeight: 500,
          maxWidth: 500,
          includeBase64: true
        },
        (callback) => {
          if (callback.errorCode === "camera_unavailable") {
            setSnackState(ss.failState(strings.camera_unavailable));
            return;
          } else if (callback.errorCode === "permission") {
            setSnackState(ss.failState(strings.permission));
            return;
          } else if (callback.errorCode === "others") {
            setSnackState(ss.failState(strings.other));
            return;
          } else if (callback.didCancel) {
            logger("camera cancel");
          } else {
            const base64 = {
              uri: "data:image/jpeg;base64," + callback.assets[0].base64
            };
            handleUpdateImage(base64.uri);
          }
        }
      );
    }
  };

  const navToEditProfile = (data: any) => {
    // page PageEditProfile
    navigation.navigate("PageEditProfile", { data: data });
  };

  const logOut = () => {
    setModalAlert(!modalAlert);
    dispatch(loggingIn({ isLogin: false, email: "" }));
    dispatch(setProfileRedux(null));
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: pages.SignIn }]
      })
    );
  };

  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <DummyFlatList>
        <ProfileHeader
          navigation={navigation}
          onPress={() => refRBSheet.current.open()}
          uri={imageUrl}
        />
        <View style={styles.content}>
          <TextItem style={styles.title}>{strings.name}</TextItem>
          <Button
            onPress={() =>
              navToEditProfile({
                type: "nama",
                title: "Ubah Nama",
                valueParams: profile?.firstName
              })
            }
            style={styles.boxItem}
          >
            <TextInput
              style={styles.textInput}
              editable={false}
              value={profile?.firstName}
            />
            <EditGray />
          </Button>
          {/* <TextItem style={styles.title}>{strings.alamat}</TextItem> */}
          {/* <Button
            onPress={() =>
              navToEditProfile({
                type: "email",
                title: "Ubah Email",
                valueParams: profile?.email,
              })
            }
            style={styles.boxItem}
          >
            <TextInput
              style={styles.textInput}
              editable={false}
              value={profile?.email}
              keyboardType="email-address"
            />
            <EditGray />
          </Button> */}
          {/* string password */}
          <TextItem style={styles.title}>{strings.password}</TextItem>
          <Button
            onPress={() =>
              navToEditProfile({ type: "password", title: "Ubah Password" })
            }
            style={styles.boxItem}
          >
            <TextInput
              style={styles.textInput}
              editable={false}
              value={profile?.email + "sj897"}
              secureTextEntry={true}
            />
            <EditGray />
          </Button>
          {/* <Button
            onPress={() => {
              setModalAlert(true);
              setTextAlert({
                action: 'Cancel',
                text: 'Yakin ingin keluar?',
                button: 'Keluar'
              });
            }}
            style={styles.btnKeluar}
          >
            <TextItem style={styles.title}>{strings.btn_keluar}</TextItem>
          </Button> */}
        </View>
      </DummyFlatList>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)"
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24
          }
        }}
        height={165}
      >
        <View style={styles.contaonerSheet}>
          <TextItem style={[styles.title, styles.titleGantiFoto]}>
            {strings.ganti_foto}
          </TextItem>
          <Button
            onPress={() => handleImagePicker("camera")}
            style={styles.btnTakeAction}
          >
            <TextItem style={styles.textTake}>
              {strings.ambil_langsung}
            </TextItem>
            <ChevronRight />
          </Button>
          <Button
            onPress={() => handleImagePicker("galery")}
            style={styles.btnTakeAction}
          >
            <TextItem style={styles.textTake}>{strings.ambil_galery}</TextItem>
            <ChevronRight />
          </Button>
        </View>
      </RBSheet>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAlert}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentAlert}>
            <DummyFlatList>
              <View style={styles.boxContentAlert}>
                <AlertModal />
                <TextItem style={styles.textAlert}>{textAlert.text}</TextItem>
              </View>
              <Button
                onPress={() => setModalAlert(!modalAlert)}
                style={styles.btnAlert}
              >
                <TextItem style={styles.textActionAlert}>
                  {textAlert.action}
                </TextItem>
              </Button>
              <Button
                onPress={() => {
                  logOut();
                }}
                style={[styles.btnAlert, styles.btnAlertSecond]}
              >
                <TextItem style={styles.textButtonAlert}>
                  {textAlert.button}
                </TextItem>
              </Button>
            </DummyFlatList>
          </View>
        </View>
      </Modal>
    </Base>
  );
}
