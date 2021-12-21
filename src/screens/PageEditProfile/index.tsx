import {
  AboutHeader,
  Base,
  Button,
  DummyFlatList,
  TextField,
  TextItem,
} from "../../components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
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
} from "../../constants";
import { Check, Exit, Eye, EyeOff } from "@assets";
import { useDispatch, useSelector } from "react-redux";
// import { saveEmail, saveNama, savePassword } from '../../redux/actions';
import { SnackStateProps } from "../../components/atom/Base/types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { loggingIn, setProfileRedux } from "../../redux/actions";
import { ReduxState } from "../../redux/reducers";
import { fetchProfile } from "../../services";
import { logger } from "../../helpers";

const { textFieldState } = dv;

export default function PageEditProfile({ route, navigation }: any) {
  const {
    sessionReducer: { email },
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

  const getProfileData = async () => {
    try {
      const [profileData] = await Promise.all([fetchProfile(email)]);
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
        Icon: <Check stroke={successColor.main} />,
      };
    }
    if (value.length === 0) {
      return {
        message: strings.emailCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.invalidEmail,
      state: textFieldState.warn,
    };
  }, [value]);

  const passwordCheck = useMemo(() => {
    if (passwordBaru === undefined) {
      return { state: textFieldState.none };
    }
    if (passwordBaru?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success,
      };
    }
    if (passwordBaru.length === 0) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.passwordMinChar,
      state: textFieldState.warn,
    };
  }, [passwordBaru]);

  const passwordCheckLama = useMemo(() => {
    if (passwordLama === undefined) {
      return { state: textFieldState.none };
    }
    if (passwordLama?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success,
      };
    }
    if (passwordLama.length === 0) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.passwordMinChar,
      state: textFieldState.warn,
    };
  }, [passwordLama]);

  const passwordCheckKonfir = useMemo(() => {
    if (passwordKonfir === undefined) {
      return { state: textFieldState.none };
    }
    if (passwordKonfir?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success,
      };
    }
    if (passwordKonfir.length === 0) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.passwordMinChar,
      state: textFieldState.warn,
    };
  }, [passwordKonfir]);

  const handlePassword = () => {
    if (passwordLama != "") {
      if (passwordBaru === passwordKonfir) {
        setIsLoading(true);
        reauthenticate(passwordLama)
          .then(() => {
            user
              ?.updatePassword(passwordBaru)
              .then(() => {
                // success
                setSnackState(ss.successState(strings.success));
              })
              .catch((error) => {
                logger(error);
                setIsLoading(false);
                setSnackState(ss.failState("password error"));
              })
              .finally(() => {
                navigation.navigate(pages.Profile);
              });
          })
          .catch((error) => {
            logger(error);
            setIsLoading(false);
            setSnackState(ss.failState("password error"));
          });
      } else {
        setSnackState(ss.failState(strings.password_tidak_sama));
        setIsLoading(false);
      }
    } else {
      setSnackState(ss.failState(strings.password_lama_kosong));
      setIsLoading(false);
    }
  };

  const reauthenticate = (currentPassword) => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleValue = () => {
    if (value !== "") {
      setIsLoading(true);
      switch (type) {
        case "nama":
          user
            ?.updateProfile({
              displayName: value,
            })
            .then(() => {
              firestore()
                .collection("users")
                .doc(uid)
                .update({
                  firstName: value,
                  sign_up_date: firestore.FieldValue.serverTimestamp(),
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
                    .collection("users")
                    .doc(uid)
                    .update({
                      email: value,
                      sign_up_date: firestore.FieldValue.serverTimestamp(),
                    })
                    .then(async () => {
                      try {
                        const [profileData] = await Promise.all([
                          fetchProfile(value),
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
          {type !== "password" ? (
            <>
              <TextItem style={styles.title}>{type}</TextItem>
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
                    style={styles.textInput}
                    selectionColor={neutralColor[90]}
                    onChangeText={(e) => setValue(e)}
                    value={value}
                    keyboardType={
                      type === "email" ? "email-address" : "default"
                    }
                    autoCapitalize={type === "email" ? "none" : "words"}
                  />
                  <Button disabled={isLoading} onPress={() => setValue("")}>
                    <Exit color={neutralColor[60]} />
                  </Button>
                </View>
              )}
              <TextItem style={styles.textAlert}>
                {strings.alertEditProfile}
              </TextItem>
            </>
          ) : (
            <View>
              <TextItem style={styles.title}>{strings.password_lama}</TextItem>
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
                {...passwordCheckLama}
              />
              <TextItem style={styles.textAlert}>
                {strings.alertEditProfile}
              </TextItem>

              <TextItem style={styles.title}>{strings.password_baru}</TextItem>
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
                onChangeText={setPasswordBaru}
                iconPress={() => setIsSecurePassword((current) => !current)}
                {...passwordCheck}
              />
              <TextItem style={styles.textAlert}>
                {strings.password_minimal}
              </TextItem>

              <TextItem style={styles.title}>
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
              />
            </View>
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
                <TextItem style={styles.textBtn}>{strings.btn_simpan}</TextItem>
              )}
            </Button>
            <Button
              disabled={isLoading}
              onPress={() => navigation.goBack()}
              style={[styles.btnAction, styles.btnBatal]}
            >
              <TextItem style={[styles.textBtn, styles.textBatal]}>
                {strings.btn_batal}
              </TextItem>
            </Button>
          </View>
        </View>
      </DummyFlatList>
    </Base>
  );
}
