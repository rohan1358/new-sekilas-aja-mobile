import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  Base,
  BigButton,
  Button,
  Gap,
  TextField,
  TextItem,
} from "../../components";
import { pages, spacing as sp } from "../../constants";
import styles from "./styles";

const SignIn = ({ navigation }: any) => {
  return (
    <Base>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Gap vertical={sp.sm} />
        <TextItem type="b.20.nc.90">Alamat Email</TextItem>
        <Gap vertical={sp.xs} />
        <TextField placeholder="Isi email disini ..." />
        <Gap vertical={sp.xs} />
        <TextItem type="b.20.nc.90">Masukin Password</TextItem>
        <Gap vertical={sp.xs} />
        <TextField placeholder="Isi password disini ..." />
        <Gap vertical={sp.xs} />
        <View style={{ alignItems: "flex-end" }}>
          <Button>
            <TextItem type="b.14.nc.90" style={styles.underlineText}>
              Lupa password?
            </TextItem>
          </Button>
        </View>
        <Gap vertical={sp.sm} />
        <BigButton label="Masuk!" />
        <Gap vertical={sp.sm} />
        <View style={styles.bottomCta}>
          <TextItem type="r.14.nc.90">Belum punya akun? </TextItem>
          <Button onPress={() => navigation.navigate(pages.SignUp)}>
            <TextItem type="b.14.nc.90" style={styles.underlineText}>
              Daftar di sini.
            </TextItem>
          </Button>
        </View>
      </ScrollView>
    </Base>
  );
};

export default SignIn;
