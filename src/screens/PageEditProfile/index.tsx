import {
  AboutHeader,
  Base,
  Button,
  DummyFlatList,
  TextField,
  TextItem
} from "../../components";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import styles from "./styles";
import {
  neutralColor,
  strings,
  snackState as ss,
  pages,
  defaultValue as dv,
  successColor,
  primaryColor,
  firebaseNode,
  neutralColorText
} from "../../constants";
import { CommonActions } from "@react-navigation/routers";

import { Check, Exit, Eye, EyeOff } from "@assets";
import { useDispatch, useSelector } from "react-redux";
// import { saveEmail, saveNama, savePassword } from '../../redux/actions';
import { SnackStateProps } from "../../components/atom/Base/types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { loggingIn, setProfileRedux } from "../../redux/actions";
import { ReduxState } from "../../redux/reducers";
import { fetchProfile, newUpdateUser, updateUser } from "../../services";
import { logger } from "../../helpers";
import { useIsFocused } from "@react-navigation/native";
import { encrypt } from "../../utils";

const { textFieldState } = dv;

let pernahInput = {
  pwLama: false,
  pwBaru: false
};

export default function PageEditProfile({ route, navigation }: any) {
  const {
    sessionReducer: { email },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const dispatch = useDispatch();

  const user = auth().currentUser;
  const uid = user?.uid;

  const { type, title, valueParams } = route.params.data;

  const [value, setValue] = useState(valueParams);
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [passwordKonfir, setPasswordKonfir] = useState("");
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSecurePassword, setIsSecurePassword] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      pernahInput = {
        pwLama: false,
        pwBaru: false
      };
    };
  }, []);

  const getProfileData = async () => {
    try {
      const [profileData] = await Promise.all([
        fetchProfile(email, profile.id)
      ]);
      if (profileData.isSuccess) {
        dispatch(setProfileRedux(profileData.data));
      } else {
        setIsLoading(false);
        throw new Error("Fail on fetching profile data");
      }
    } catch (error) {
      setIsLoading(false);
      logger("Profile, getProfileData", error);
    } finally {
      navigation.navigate(pages.Profile);
    }
  };

  const emailCheck = useMemo(() => {
    if (value === undefined) {
      return { state: textFieldState.none };
    }
    if (value.match(dv.regexEmail)) {
      return {
        message: "",
        state: textFieldState.success,
        Icon: <Check stroke={successColor.main} />
      };
    }
    if (value.length === 0) {
      return {
        message: strings.emailCantBeEmpty,
        state: textFieldState.warn
      };
    }
    return {
      message: strings.invalidEmail,
      state: textFieldState.warn
    };
  }, [value]);

  const passwordCheckLama = useMemo(() => {
    if (!pernahInput.pwLama) {
      return { state: textFieldState.none };
    }
    if (pernahInput.pwLama && !passwordLama) {
      return {
        message: strings.passwordCantBeEmpty,

        state: textFieldState.warn
      };
    }
    if (passwordLama?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success
      };
    }
    // if (passwordLama.length === 0) {
    //   return {
    //     state: textFieldState.warn
    //   };
    // }
    // return {
    //   message: strings.passwordMinChar,
    //   state: textFieldState.warn
    // };
  }, [passwordLama]);

  const passwordCheck = useMemo(() => {
    if (!pernahInput.pwBaru) {
      return {
        state: textFieldState.none
      };
    }
    if (pernahInput.pwBaru && !passwordBaru) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn
      };
    }

    if (passwordBaru.length <= 6) {
      return {
        message: strings.passwordMinChar,
        state: textFieldState.warn
      };
    }

    if (passwordBaru?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success
      };
    }

    // return {
    //   message: strings.passwordMinChar,
    //   state: textFieldState.warn
    // };
  }, [passwordBaru]);

  const passwordCheckKonfir = useMemo(() => {
    if (passwordKonfir === undefined) {
      return { state: textFieldState.none };
    }
    if (passwordKonfir?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success
      };
    }
    if (passwordKonfir.length === 0) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn
      };
    }
    return {
      message: strings.passwordMinChar,
      state: textFieldState.warn
    };
  }, [passwordKonfir]);

  const logOut = () => {
    dispatch(loggingIn({ isLogin: false, email: "" }));
    dispatch(setProfileRedux(null));
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: pages.SignIn }]
      })
    );
  };

  const relogin = () => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, passwordLama)
        .then((res) => {
          resolve("password lama benar");
        })
        .catch((err) => {
          reject("password lama salah");
        });
    });
  };

  const handlePassword = () => {
    if (passwordLama) {
      relogin()
        .then((res) => {
          // check password form password baru terisi
          if (!passwordBaru) {
            setIsLoading(false);
            setSnackState(ss.failState("password error"));
          }
          // check password sama
          else if (passwordBaru && passwordBaru !== passwordLama) {
            setIsLoading(true);

            user
              ?.updatePassword(passwordBaru)
              .then(async () => {
                // success
                setSnackState(ss.successState(strings.success));
                await newUpdateUser(user.uid, {
                  password: encrypt(passwordBaru)
                });
                navigation.navigate(pages.Profile);
              })
              .catch((error) => {
                if (
                  error.message ===
                  "[auth/user-token-expired] The user's credential is no longer valid. The user must sign in again."
                ) {
                  // relogin();
                } else {
                  setIsLoading(false);
                  setSnackState(ss.failState("password error"));
                }
              });
          } else {
            setSnackState(ss.failState("password tidak boleh sama"));
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setSnackState(ss.failState(err));
        });
    } else {
      // string password lama tidak boleh kosong
      setSnackState(ss.failState("password lama tidak boleh kosong"));
      setIsLoading(false);
    }
  };

  const reauthenticate = (currentPassword: any) => {
    return new Promise(async (resolve, reject) => {
      var user = auth().currentUser;
      // var user = auth().currentUser;

      // var cred = await auth.EmailAuthProvider.credential(
      //   email,
      //   currentPassword
      // );
      // user
      //   ?.reauthenticateWithCredential(cred)
      //   ?.then((res) => {
      //     console.log(res);
      //     resolve(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     reject(err);
      //   });
    });
  };

  const handleValue = () => {
    if (value !== "") {
      setIsLoading(true);
      switch (type) {
        case "nama":
          user
            ?.updateProfile({
              displayName: value
            })
            .then(() => {
              firestore()
                .collection(firebaseNode.users)
                .doc(uid)
                .update({
                  firstName: value,
                  sign_up_date: firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                  setSnackState(ss.successState(strings.success));
                })
                .catch(() => {
                  setIsLoading(false);
                })
                .finally(() => {
                  getProfileData();
                });
            })
            .catch(() => {
              setIsLoading(false);
            });
          break;
        case "email":
          reauthenticate(passwordLama)
            .then(() => {
              user
                ?.updateEmail(value)
                .then(() => {
                  firestore()
                    .collection(firebaseNode.users)
                    .doc(uid)
                    .update({
                      email: value,
                      sign_up_date: firestore.FieldValue.serverTimestamp()
                    })
                    .then(async () => {
                      try {
                        const [profileData] = await Promise.all([
                          fetchProfile(value, profile.id)
                        ]);
                        if (profileData.isSuccess) {
                          dispatch(setProfileRedux(profileData.data));
                          dispatch(loggingIn({ isLogin: true, email: value }));
                          setSnackState(ss.successState(strings.success));
                        } else {
                          setIsLoading(false);
                          throw new Error("Fail on fetching profile data");
                        }
                      } catch (error) {
                        setIsLoading(false);
                        logger("Profile, getProfileData", error);
                      } finally {
                        navigation.navigate(pages.Profile);
                      }
                    });
                })
                .catch((error) => {
                  logger(error);
                  setIsLoading(false);
                  setSnackState(ss.failState("update filed!"));
                });
            })
            .catch((error) => {
              logger(error);
              setIsLoading(false);
              setSnackState(ss.failState("password error"));
            });
          break;

        default:
          break;
      }
    } else {
      setSnackState(ss.failState(strings.data_kosong));
    }
  };

  const handleSimpan = () => {
    Keyboard.dismiss();
    if (type === "nama" || type === "email") {
      handleValue();
    } else {
      handlePassword();
    }
  };

  return (
    <Base {...{ snackState, setSnackState }}>
      <AboutHeader title={title} navigation={navigation} />
      <DummyFlatList>
        <View style={styles.content}>
          {type === "password" ? (
            <>
              <View>
                <TextItem
                  style={[
                    styles.title,
                    {
                      color: neutralColorText[90]
                    }
                  ]}
                >
                  {strings.password_lama}
                </TextItem>
                <TextField
                  // style={{
                  //   color: neutralColorText[90]
                  // }}
                  placeholder={strings.passwordPlaceholder}
                  Icon={
                    isSecurePassword ? (
                      <EyeOff stroke={neutralColor[50]} />
                    ) : (
                      <Eye stroke={neutralColor[50]} />
                    )
                  }
                  secureTextEntry={isSecurePassword}
                  onChangeText={(e) => {
                    pernahInput.pwLama = true;
                    setPasswordLama(e);
                  }}
                  iconPress={() => setIsSecurePassword((current) => !current)}
                  {...passwordCheckLama}
                />
                {/* <TextItem style={styles.textAlert}>
                {strings.alertEditProfile}
              </TextItem> */}

                <TextItem
                  style={[
                    styles.title,
                    {
                      color: neutralColorText[90]
                    }
                  ]}
                >
                  {strings.password_baru}
                </TextItem>
                <TextField
                  placeholder={strings.passwordPlaceholder}
                  Icon={
                    isSecurePassword ? (
                      <EyeOff stroke={neutralColor[50]} />
                    ) : (
                      <Eye stroke={neutralColor[50]} />
                    )
                  }
                  secureTextEntry={isSecurePassword}
                  onChangeText={(e) => {
                    pernahInput.pwBaru = true;
                    setPasswordBaru(e);
                  }}
                  iconPress={() => setIsSecurePassword((current) => !current)}
                  {...passwordCheck}
                />
                {/* <TextItem style={styles.textAlert}>
                {strings.password_minimal}
              </TextItem> */}

                {/* <TextItem style={[styles.title, {
    color: neutralColorText[90],

                }]}>
                {strings.password_konfir}
              </TextItem>
              <TextField
                placeholder={strings.passwordPlaceholder}
                Icon={
                  isSecurePassword ? (
                    <EyeOff stroke={neutralColor[50]} />
                  ) : (
                    <Eye stroke={neutralColor[50]} />
                  )
                }
                secureTextEntry={isSecurePassword}
                onChangeText={setPasswordKonfir}
                iconPress={() => setIsSecurePassword((current) => !current)}
                {...passwordCheckKonfir}
              /> */}
              </View>
            </>
          ) : (
            <>
              <TextItem
                style={[
                  styles.title,
                  {
                    color: neutralColorText[90]
                  }
                ]}
              >
                {type}
              </TextItem>
              {type == "email" ? (
                <View>
                  <TextField
                    value={value}
                    placeholder={strings.emailPlaceholder}
                    onChangeText={setValue}
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                    {...emailCheck}
                  />
                  <TextField
                    placeholder={strings.passwordPlaceholder}
                    Icon={
                      isSecurePassword ? (
                        <EyeOff stroke={neutralColor[50]} />
                      ) : (
                        <Eye stroke={neutralColor[50]} />
                      )
                    }
                    secureTextEntry={isSecurePassword}
                    onChangeText={setPasswordLama}
                    iconPress={() => setIsSecurePassword((current) => !current)}
                    {...passwordCheck}
                  />
                </View>
              ) : (
                <View style={styles.boxItem}>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        color: neutralColorText[90]
                      }
                    ]}
                    selectionColor={neutralColor[90]}
                    onChangeText={(e) => setValue(e)}
                    value={value}
                    keyboardType={
                      type === "email" ? "email-address" : "default"
                    }
                    autoCapitalize={type === "email" ? "none" : "words"}
                  />
                  <Button disabled={isLoading} onPress={() => setValue("")}>
                    <Exit stroke={neutralColorText[60]} />
                  </Button>
                </View>
              )}
              {/* <TextItem style={styles.textAlert}>
              {strings.alertEditProfile}
            </TextItem> */}
            </>
          )}
          <View style={styles.boxBtnAction}>
            <Button
              disabled={isLoading}
              onPress={() => handleSimpan()}
              style={styles.btnAction}
            >
              {isLoading ? (
                <ActivityIndicator color={primaryColor.main} size="large" />
              ) : (
                <TextItem style={styles.textBtn}>
                  {/* string Simpan */}
                  Simpan
                </TextItem>
              )}
            </Button>
            <Button
              disabled={isLoading}
              onPress={() => navigation.goBack()}
              style={[styles.btnAction, styles.btnBatal]}
            >
              <TextItem
                style={[
                  styles.textBtn,
                  styles.textBatal,
                  {
                    color: neutralColorText[60]
                  }
                ]}
              >
                {/* string Batal */}
                Batal
              </TextItem>
            </Button>
          </View>
        </View>
      </DummyFlatList>
    </Base>
  );
}
