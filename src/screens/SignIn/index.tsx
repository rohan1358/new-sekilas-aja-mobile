import auth from "@react-native-firebase/auth";
import { Link, useFocusEffect } from "@react-navigation/native";
import { fetchProfile } from "@services";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Keyboard, Linking, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { checkData, validateEmail } from "../../utils";
import { Alert, Check, Eye, EyeOff } from "../../../assets";
import {
  Base,
  BigButton,
  Button,
  Gap,
  TextField,
  TextItem
} from "../../components";
import { SnackStateProps } from "../../components/atom/Base/types";
import {
  dangerColor,
  defaultValue as dv,
  neutralColor,
  pages,
  snackState as ss,
  spacing as sp,
  strings,
  successColor
} from "../../constants";
import { loggingIn, setProfileRedux } from "../../redux/actions";
import styles from "./styles";
import { ReduxState } from "@rux";

const { textFieldState } = dv;

const SignIn = ({ navigation }: any) => {
  const {
    sessionReducer: { isLogin },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const dispatch = useDispatch();
  const currentEmail = useRef<string>();
  const currentPassword = useRef<string>();

  const [email, setEmail] = useState<string>();
  const [isEmailNotFound, setIsEmailNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
  const [isSecurePassword, setIsSecurePassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

  const refFocus = useRef<object>();

  const ctaDisabling = () => {
    const check = [emailCheck.state, passwordCheck.state];
    return !check.every((item) => item === textFieldState.success);
  };

  const emailCheck = useMemo(() => {
    if (currentEmail.current !== email) {
      setIsEmailNotFound(false);
    }
    if (isEmailNotFound) {
      return { state: textFieldState.warn };
    }
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
  }, [email, isEmailNotFound]);

  const passwordCheck = useMemo(() => {
    if (currentPassword.current !== password) {
      setIsPasswordWrong(false);
    }
    if (isPasswordWrong) {
      return {
        message: "",
        state: textFieldState.warn
      };
    }
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
  }, [password, isPasswordWrong]);

  const LoginPress = () => {
    if (isLoading) {
      return;
    }
    if (!email || !password) {
      return;
    }
    Keyboard.dismiss();
    setIsLoading(true);
    currentPassword.current = password;
    currentEmail.current = email;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        //
        const uid = res.user.uid;

        const profile = await fetchProfile(email, uid);

        setTimeout(() => {
          navigation.replace(pages.Home);
        }, 250);

        dispatch(setProfileRedux(profile.data));

        dispatch(loggingIn({ isLogin: true, email }));
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setIsEmailNotFound(true);
          setSnackState(ss.failState(strings.emailNotFound));
        }

        if (error.code === "auth/wrong-password") {
          setIsPasswordWrong(true);
          setSnackState(ss.failState(strings.passwordInvalid));
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
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Gap vertical={sp.sm} />
        <TextItem type="b.20.nct2.90">{strings.emailAddress}</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          ref={refFocus}
          placeholder={strings.emailPlaceholder}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize={"none"}
          Icon={
            isEmailNotFound ? <Alert stroke={dangerColor.main} /> : undefined
          }
          {...emailCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nct2.90">{strings.enterPassword}</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          autoCapitalize="none"
          placeholder={strings.passwordPlaceholder}
          onChangeText={setPassword}
          Icon={
            isPasswordWrong ? (
              <Alert stroke={dangerColor.main} />
            ) : isSecurePassword ? (
              <EyeOff stroke={neutralColor[50]} />
            ) : (
              <Eye stroke={neutralColor[50]} />
            )
          }
          secureTextEntry={isSecurePassword}
          iconPress={() => setIsSecurePassword((current) => !current)}
          {...passwordCheck}
        />
        <Gap vertical={sp.xs} />
        <View style={{ alignItems: "flex-end" }}>
          <Button
            onPress={() =>
              Linking.openURL("https://sekilasaja.com/lupa-password")
            }
          >
            <TextItem style={styles.underlineText} type="b.14.nct2.90">
              {strings.forgotPassword}
            </TextItem>
          </Button>
        </View>
        <Gap vertical={sp.sm} />
        <BigButton
          label={strings.login}
          disabled={ctaDisabling()}
          onPress={LoginPress}
          isLoading={isLoading}
        />
        <Gap vertical={sp.sm} />
        <View style={styles.bottomCta}>
          <TextItem type="r.14.nct2.90">{`${strings.dontHaveAcc} `}</TextItem>
          <Button onPress={() => navigation.navigate(pages.SignUp)}>
            <TextItem type="b.14.nct2.90">{strings.registHere}</TextItem>
          </Button>
        </View>
      </ScrollView>
    </Base>
  );
};

export default SignIn;
