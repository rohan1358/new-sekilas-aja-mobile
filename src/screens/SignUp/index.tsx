import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Check, EyeOff } from "../../../assets";
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
  successColor,
} from "../../constants";
import styles from "./styles";
import { SignUpProps } from "./types";

const { textFieldState } = dv;

const SignUp = ({ navigation }: SignUpProps) => {
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repassword, setRepassword] = useState<string>();

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
        message: "Email tidak boleh kosong",
        state: textFieldState.warn,
      };
    }
    return {
      message: "Email tidak valid",
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
        message: "Nama tidak boleh kosong",
        state: textFieldState.warn,
      };
    }
    return {
      message: "Nama minimal berisi 3 karakter",
      state: textFieldState.warn,
    };
  }, [name]);

  const passwordCheck = useMemo(() => {
    if (password === undefined) {
      return { state: textFieldState.none };
    }
    if (password?.length > 8) {
      return {
        message: "",
        state: textFieldState.success,
        Icon: <Check stroke={successColor.main} />,
      };
    }
    if (password.length === 0) {
      return {
        message: "Password tidak boleh kosong",
        state: textFieldState.warn,
      };
    }
    return {
      message: "Password minimal berisi 8 karakter",
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
        Icon: <Check stroke={successColor.main} />,
      };
    }
    return {
      message: "Password tidak sama",
      state: textFieldState.warn,
    };
  }, [repassword, password]);

  const ctaDisabling = () => {
    const check = [nameCheck.state, passwordCheck.state, repasswordCheck.state];
    return !check.every((item) => item === textFieldState.success);
  };

  return (
    <Base>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Gap vertical={sp.sm} />
        <TextItem type="b.20.nc.90">Nama</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          placeholder="Isi nama disini ..."
          onChangeText={setName}
          autoCapitalize="words"
          {...nameCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Alamat Email</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          placeholder="Isi email disini ..."
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          {...emailCheck}
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Masukin Password</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          placeholder="Isi password disini ..."
          Icon={<EyeOff stroke={neutralColor[50]} />}
          {...passwordCheck}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Konfirmasi Password</TextItem>
        <Gap vertical={sp.xs} />
        <TextField
          onChangeText={setRepassword}
          placeholder="Isi password disini ..."
          Icon={<EyeOff stroke={neutralColor[50]} />}
          secureTextEntry
          {...repasswordCheck}
        />
        <Gap vertical={sp.sm} />
        <View style={styles.centering}>
          <TextItem type="r.14.nc.90" style={{ textAlign: "center" }}>
            Dengan membuat akun baru saya menyetujui{" "}
          </TextItem>
          <View style={styles.centerEnd}>
            <Button>
              <TextItem type="b.14.nc.90" style={styles.underlineText}>
                Ketentuan Layanan
              </TextItem>
            </Button>
            <TextItem type="r.14.nc.90">{` & `}</TextItem>
            <Button>
              <TextItem type="b.14.nc.90" style={styles.underlineText}>
                Kebijakan Privasi
              </TextItem>
            </Button>
          </View>
        </View>
        <Gap vertical={sp.sm} />
        <BigButton label="Daftar!" disabled={ctaDisabling()} />
        <Gap vertical={sp.sm} />
        <View style={styles.bottomCta}>
          <TextItem type="r.14.nc.90">Sudah punya akun? </TextItem>
          <Button onPress={() => navigation.navigate(pages.SignIn)}>
            <TextItem type="b.14.nc.90" style={styles.underlineText}>
              Login di sini.
            </TextItem>
          </Button>
        </View>
      </ScrollView>
    </Base>
  );
};

export default SignUp;
