import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Check, Eye, EyeOff } from "../../../assets";
import {
  Base,
  BigButton,
  Button,
  Gap,
  TextField,
  TextItem,
} from "../../components";
import {
  defaultValue as dv,
  neutralColor,
  pages,
  spacing as sp,
  strings,
  successColor,
  snackState as ss,
} from "../../constants";
import styles from "./styles";
import { SignUpProps } from "./types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { textFieldState } = dv;

const SignUp = ({ navigation }: SignUpProps) => {
  const [email, setEmail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isSecurePassword, setIsSecurePassword] = useState<boolean>(true);
  const [isSecureRePassword, setIsSecureRepassword] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repassword, setRepassword] = useState<string>();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

  const ctaDisabling = () => {
    const check = [
      nameCheck.state,
      emailCheck.state,
      passwordCheck.state,
      repasswordCheck.state,
    ];
    return !check.every((item) => item === textFieldState.success);
  };

  const emailCheck = useMemo(() => {
    if (email === undefined) {
      return { state: textFieldState.none };
    }
    if (email.match(dv.regexEmail)) {
      return {
        message: "",
        state: textFieldState.success,
        Icon: <Check stroke={successColor.main} />,
      };
    }
    if (email.length === 0) {
      return {
        message: strings.emailCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.invalidEmail,
      state: textFieldState.warn,
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
        Icon: <Check stroke={successColor.main} />,
      };
    }
    if (name.length === 0) {
      return {
        message: strings.nameCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.nameMinChar,
      state: textFieldState.warn,
    };
  }, [name]);

  const passwordCheck = useMemo(() => {
    if (password === undefined) {
      return { state: textFieldState.none };
    }
    if (password?.length >= 8) {
      return {
        message: "",
        state: textFieldState.success,
      };
    }
    if (password.length === 0) {
      return {
        message: strings.passwordCantBeEmpty,
        state: textFieldState.warn,
      };
    }
    return {
      message: strings.passwordMinChar,
      state: textFieldState.warn,
    };
  }, [password]);

  const repasswordCheck = useMemo(() => {
    if (!repassword) {
      return { state: textFieldState.none };
    }
    if (repassword === password) {
      return {
        message: "",
        state: textFieldState.success,
      };
    }
    return {
      message: strings.passwordDontMatch,
      state: textFieldState.warn,
    };
  }, [repassword, password]);

  const RegistPress = () => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection("users")
          .add({
            firstName: name,
            email,
            sign_up_date: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            // navigation.navigate()
            // redux management and navigate
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setSnackState(ss.failState("Email sudah terdaftar"));
        }

        if (error.code === "auth/invalid-email") {
          setSnackState(ss.failState("Email tidak valid"));
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Base {...{ snackState, setSnackState }}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Gap vertical={sp.sm} />
        <TextItem type="b.20.nc.90">Nama</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          placeholder={strings.namePlaceholder}
          onChangeText={setName}
          autoCapitalize="words"
          {...nameCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Alamat Email</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          placeholder={strings.emailPlaceholder}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize={"none"}
          {...emailCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Masukin Password</TextItem>
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
          onChangeText={setPassword}
          secureTextEntry={isSecurePassword}
          iconPress={() => setIsSecurePassword((current) => !current)}
          {...passwordCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Konfirmasi Password</TextItem>
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
        <Gap vertical={sp.sm} />
        <View style={styles.centering}>
          <TextItem type="r.14.nc.90" style={styles.textCenter}>
            {`${strings.agreeByCreate} `}
          </TextItem>
          <View style={styles.centerEnd}>
            <Button>
              <TextItem type="b.14.nc.90" style={styles.underlineText}>
                {strings.terms}
              </TextItem>
            </Button>
            <TextItem type="r.14.nc.90">{` & `}</TextItem>
            <Button>
              <TextItem type="b.14.nc.90" style={styles.underlineText}>
                {strings.policy}
              </TextItem>
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
            <TextItem type="b.14.nc.90" style={styles.underlineText}>
              {strings.loginHere}
            </TextItem>
          </Button>
        </View>
      </ScrollView>
    </Base>
  );
};

export default SignUp;
