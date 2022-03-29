import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useMemo, useState, useRef, useCallback } from "react";
import { Keyboard, Linking, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Alert, Check, Eye, EyeOff } from "../../../assets";
import {
  Base,
  BigButton,
  Button,
  Gap,
  TextField,
  TextItem
} from "../../components";
import {
  dangerColor,
  defaultValue as dv,
  firebaseNode,
  neutralColor,
  pages,
  snackState as ss,
  spacing as sp,
  strings,
  successColor
} from "../../constants";
import styles from "./styles";
import { SignUpProps } from "./types";
import { useDispatch } from "react-redux";
import { loggingIn, setProfileRedux } from "../../redux/actions";
import { fetchProfile } from "@services";
import { Platform } from "react-native";
import { checkData, validateEmail } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";

const { textFieldState } = dv;

const SignUp = ({ navigation }: SignUpProps) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isSecurePassword, setIsSecurePassword] = useState<boolean>(true);
  const [isSecureRePassword, setIsSecureRepassword] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>();
  const [repassword, setRepassword] = useState<string>();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

  const refFocus = useRef<object>();

  const ctaDisabling = () => {
    const check = [
      nameCheck.state,
      emailCheck.state,
      passwordCheck.state
      // repasswordCheck.state
    ];
    return !check.every((item) => item === textFieldState.success);
  };

  const emailCheck = useMemo(() => {
    if (email === undefined) {
      return { state: textFieldState.none };
    }
    if (validateEmail(email)) {
      return {
        message: "",
        state: textFieldState.success,
        Icon: <Check stroke={successColor.main} />
      };
    }
    if (email.length === 0) {
      return {
        message: strings.emailCantBeEmpty,
        state: textFieldState.warn
      };
    }
    if (!validateEmail(email)) {
      return {
        message: strings.invalidEmail,
        state: textFieldState.warn,
        Icon: <Alert stroke={dangerColor.main} />
      };
    }
    return {
      message: strings.invalidEmail,
      state: textFieldState.warn
    };
  }, [email]);

  const nameCheck = useMemo(() => {
    if (name === undefined) {
      return { state: textFieldState.none };
    }
    if (name?.length > 3) {
      return {
        message: "",
        state: textFieldState.success,
        Icon: <Check stroke={successColor.main} />
      };
    }
    if (name.length === 0) {
      return {
        message: strings.nameCantBeEmpty,
        state: textFieldState.warn
      };
    }
    return {
      message: strings.nameMinChar,
      state: textFieldState.warn
    };
  }, [name]);

  const phoneNumberCheck = useMemo(() => {
    if (phoneNumber === undefined) {
      return { state: textFieldState.none };
    }
    if (phoneNumber?.length > 3) {
      return {
        message: "",
        state: textFieldState.success,
        Icon: <Check stroke={successColor.main} />
      };
    }
    if (phoneNumber.length === 0) {
      return {
        message: strings.phoneNumberCantBeEmpty,
        state: textFieldState.warn
      };
    }
    return {
      message: strings.phoneNumberCantBeEmpty,
      state: textFieldState.warn
    };
  }, [phoneNumber]);

  const passwordCheck = useMemo(() => {
    if (password === undefined) {
      return { state: textFieldState.none };
    }
    if (password?.length >= 6) {
      return {
        message: "",
        state: textFieldState.success
      };
    }
    if (password.length === 0) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn
      };
    }
    return {
      message: strings.passwordMinChar,
      state: textFieldState.warn
    };
  }, [password]);

  const repasswordCheck = useMemo(() => {
    if (!repassword) {
      return { state: textFieldState.none };
    }
    if (repassword === password) {
      return {
        message: "",
        state: textFieldState.success
      };
    }
    return {
      message: strings.passwordDontMatch,
      state: textFieldState.warn
    };
  }, [repassword, password]);

  const RegistPress = () => {
    if (isLoading) {
      return;
    }
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    Keyboard.dismiss();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resCreate) => {
        try {
          firestore()
            .collection(firebaseNode.users)
            .doc(resCreate.user.uid)
            .set({
              firstName: name,
              email,
              lastName: lastName,
              phoneNumber: phoneNumber,
              owned_books: [
                "Atomic Habits",
                "The Little Book of Common Sense Investing"
              ],
              favorite_books: [],
              is_subscribed: false,
              cart: [],
              // sign_up_date: firestore.FieldValue.serverTimestamp(),
              start_date: new Date(), // this date means UNSUBSCRIBED
              end_date: new Date(), // this date means UNSUBSCRIBED
              sign_up_date: new Date(),
              promo_codes_used: []
            })
            .then(() => {
              firestore()
                .collection("dashboard")
                .doc("track_record")
                .set(
                  {
                    sign_up: {
                      [new Date().getTime()]: { email, date: new Date() }
                    }
                  },
                  { merge: true }
                )
                .then(async (res) => {
                  //Make API request to create new subscriber for Non-Subscribers in KIRIM.EMAIL
                  fetch(
                    "https://sekilasaja.com/kirim-email-create-subscriber",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      // We convert the React state to JSON and send it as the POST body
                      body: JSON.stringify({
                        full_name: name,
                        email: email,
                        no_hp: phoneNumber,
                        kirim_email_list_id: "190689"
                      })
                    }
                  ).then(function (response) {});

                  //Make API request to create new subscriber for All in KIRIM.EMAIL
                  fetch(
                    "https://sekilasaja.com/kirim-email-create-subscriber",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      // We convert the React state to JSON and send it as the POST body
                      body: JSON.stringify({
                        full_name: name,
                        email: email,
                        no_hp: phoneNumber,
                        kirim_email_list_id: "190688"
                      })
                    }
                  ).then(function (response) {});

                  // login
                  auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(async (res) => {
                      // const email = "DanielWijaya85@gmail.com";

                      const profile = await fetchProfile(
                        email,
                        resCreate.user.uid
                      );

                      navigation.replace(pages.Home);
                      dispatch(setProfileRedux(profile.data));

                      dispatch(loggingIn({ isLogin: true, email }));
                    });
                });
            })
            .catch((err) => {});
        } catch (err) {}
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setSnackState(ss.failState(strings.emailUsed));
        }

        if (error.code === "auth/invalid-email") {
          setSnackState(ss.failState(strings.invalidEmail));
        }
      })
      .finally(() => setIsLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      refFocus.current.focus();
    }, [])
  );

  return (
    <Base {...{ snackState, setSnackState }}>
      <Gap vertical={sp.l} />

      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Gap vertical={sp.sm} />
        <TextItem type="b.20.nc.90.c">{strings.name}</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          ref={refFocus}
          placeholder={strings.namePlaceholder}
          onChangeText={setName}
          autoCapitalize="words"
          {...nameCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90.c">{strings.emailAddress}</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          placeholder={strings.emailPlaceholder}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize={"none"}
          {...emailCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90.c">{strings.enterPassword}</TextItem>
        <Gap vertical={sp.xs} />
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
          onChangeText={setPassword}
          iconPress={() => setIsSecurePassword((current) => !current)}
          {...passwordCheck}
        />

        <Gap vertical={sp.xs} />
        {/* <TextItem type="b.20.nc.90.c">{strings.enterConfirmPassword}</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          onChangeText={setRepassword}
          placeholder={strings.repasswordPlaceholder}
          Icon={
            isSecureRePassword ? (
              <EyeOff stroke={neutralColor[50]} />
            ) : (
              <Eye stroke={neutralColor[50]} />
            )
          }
          secureTextEntry={isSecureRePassword}
          iconPress={() => setIsSecureRepassword((current) => !current)}
          {...repasswordCheck}
        />
        <Gap vertical={sp.sm} /> */}

        {Platform.OS === "ios" ? (
          <></>
        ) : (
          <>
            <TextItem type="b.20.nc.90.c">{strings.numberPhone}</TextItem>
            <Gap vertical={sp.xs} />
            <TextField
              placeholder={strings.phoneNumberPlaceholder}
              onChangeText={setPhoneNumber}
              autoCapitalize="words"
              keyboardType="number-pad"
              {...phoneNumberCheck}
            />
          </>
        )}

        {checkData(password) && (
          <View style={{ alignItems: "flex-end" }}>
            <Button
              onPress={() =>
                Linking.openURL("https://sekilasaja.com/lupa-password")
              }
            >
              <TextItem style={styles.underlineText} type="b.14.nc.90">
                {strings.forgotPassword}
              </TextItem>
            </Button>
          </View>
        )}

        <Gap vertical={sp.sm} />
        <View style={styles.centering}>
          <TextItem type="r.14.nc.90" style={styles.textCenter}>
            {`${strings.agreeByCreate} `}
          </TextItem>
          <View style={styles.centerEnd}>
            <Button>
              <TextItem type="b.14.nc.90">{strings.terms}</TextItem>
            </Button>
            <TextItem type="r.14.nc.90">{` & `}</TextItem>
            <Button>
              <TextItem type="b.14.nc.90">{strings.policy}</TextItem>
            </Button>
          </View>
        </View>
        <Gap vertical={sp.sm} />
        <BigButton
          label={strings.regist}
          disabled={ctaDisabling()}
          onPress={RegistPress}
          isLoading={isLoading}
        />
        <Gap vertical={sp.sm} />
        <View style={styles.bottomCta}>
          <TextItem type="r.14.nc.90">{`${strings.doHaveAcc} `}</TextItem>
          <Button onPress={() => navigation.navigate(pages.SignIn)}>
            <TextItem type="b.14.nc.90">{strings.loginHere}</TextItem>
          </Button>
        </View>
      </ScrollView>
    </Base>
  );
};

export default SignUp;
