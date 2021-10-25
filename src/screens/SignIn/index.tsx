import React from "react";
import { View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Base, BigButton, Button, Gap, TextItem } from "../../components";
import { spacing as sp } from "../../constants";
import styles from "./styles";

const SignIn = () => {
  return (
    <Base>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Gap vertical={sp.sm} />
        <TextItem type="b.20.nc.90">Nama</TextItem>
        <Gap vertical={sp.xs} />
        <TextInput
          style={{
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#BBC0CE",
            height: 48,
            padding: sp.sm,
          }}
          placeholder="Isi password di sini..."
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
        <BigButton label="Daftar!" />
        <Gap vertical={sp.sm} />
        <View style={styles.bottomCta}>
          <TextItem type="r.14.nc.90">Sudah punya akun? </TextItem>
          <Button>
            <TextItem type="b.14.nc.90" style={styles.underlineText}>
              Login di sini.
            </TextItem>
          </Button>
        </View>
      </ScrollView>
    </Base>
  );
};

export default SignIn;
