import { AboutHeader, Base, Button, DummyFlatList, TextItem } from '../../components';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import { neutralColor, strings, snackState as ss, } from '@constants';
import { Exit, Eye, EyeOff } from '@assets';
import { useDispatch } from 'react-redux';
import { saveEmail, saveNama, savePassword } from '../../redux/actions';



export default function PageEditProfile({ route, navigation }: any) {

    const dispatch = useDispatch()
    
    const { type, title, valueParams } = route.params.data
    
    const [value, setValue] = useState(valueParams);
    const [passwordLama, setPasswordLama] = useState('');
    const [passwordBaru, setPasswordBaru] = useState('');
    const [passwordKonfir, setPasswordKonfir] = useState('');
    const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

    const [eyeBaru, setEyeBaru] = useState(true)
    const [eyeKonfir, setEyeKonfir] = useState(true)

    const handlePassword = () => {
        if (passwordLama != '') {
            if (passwordBaru === passwordKonfir) {
                dispatch(savePassword(passwordBaru))
                navigation.goBack();
            } else {
                setSnackState(ss.failState(strings.password_tidak_sama));
            }
        } else {
            setSnackState(ss.failState(strings.password_lama_kosong));
        }
    }

    const handleValue = () => {
        if (value !== '') {
            switch (type) {
                case 'nama':
                    dispatch(saveNama(value));
                    navigation.goBack();
                    break;
                case 'email':
                    dispatch(saveEmail(value));
                    navigation.goBack();
                    break;
                
                default:
                    break;
            }
        } else {
            setSnackState(ss.failState(strings.data_kosong));
        }
    }

    const handleSimpan = () => {
        if (type === 'nama' || type === 'email') {
            handleValue()
        } else {
            handlePassword();
        }
    }

    return (
        <Base {...{ snackState, setSnackState }}>
            <AboutHeader
                title={title}
                navigation={navigation}
            />
            <DummyFlatList>
                <View style={styles.content}>
                    {
                        type !== 'password' ?
                            <>
                                <TextItem style={styles.title}>{type}</TextItem>
                                <View style={styles.boxItem}>
                                    <TextInput
                                        style={styles.textInput}
                                        selectionColor={neutralColor[90]}
                                        onChangeText={(e)=> setValue(e)}
                                        value={value}
                                        keyboardType={type === 'email' ? 'email-address' : 'default'}
                                        autoCapitalize={type === 'email' ? 'none' : 'words'}
                                    />
                                    <Button onPress={() => setValue('')}>
                                        <Exit color={neutralColor[60]} />
                                    </Button>
                                </View>
                                <TextItem style={styles.textAlert}>{strings.alertEditProfile}</TextItem>
                            </>
                            :
                            <View>
                                <TextItem style={styles.title}>{strings.password_lama}</TextItem>
                                <View style={styles.boxItem}>
                                    <TextInput
                                        style={styles.textInput}
                                        selectionColor={neutralColor[90]}
                                        onChangeText={(e)=> setPasswordLama(e)}
                                        value={passwordLama}
                                        secureTextEntry={true}
                                    />
                                    <Button onPress={() => setPasswordLama('')}>
                                        <Exit color={neutralColor[60]} />
                                    </Button>
                                </View>
                                <TextItem style={styles.textAlert}>{strings.alertEditProfile}</TextItem>

                                <TextItem style={styles.title}>{strings.password_baru}</TextItem>
                                <View style={styles.boxItem}>
                                    <TextInput
                                        style={styles.textInput}
                                        selectionColor={neutralColor[90]}
                                        onChangeText={(e)=> setPasswordBaru(e)}
                                        value={passwordBaru}
                                        secureTextEntry={eyeBaru}
                                    />
                                    <Button onPress={() => setEyeBaru(!eyeBaru)}>
                                        {eyeBaru ? <EyeOff color={neutralColor[60]} /> : <Eye color={neutralColor[60]} />}
                                    </Button>
                                </View>
                                <TextItem style={styles.textAlert}>{strings.password_minimal}</TextItem>

                                <TextItem style={styles.title}>{strings.password_konfir}</TextItem>
                                <View style={styles.boxItem}>
                                    <TextInput
                                        style={styles.textInput}
                                        selectionColor={neutralColor[90]}
                                        onChangeText={(e)=> setPasswordKonfir(e)}
                                        value={passwordKonfir}
                                        secureTextEntry={eyeKonfir}
                                    />
                                    <Button onPress={()=> setEyeKonfir(!eyeKonfir)}>
                                        {eyeKonfir ? <EyeOff color={neutralColor[60]} /> : <Eye color={neutralColor[60]} />}
                                    </Button>
                                </View>
                            </View>

                    }
                    <View style={styles.boxBtnAction}>
                        <Button onPress={()=> handleSimpan()} style={styles.btnAction}>
                            <TextItem style={styles.textBtn}>{strings.btn_simpan}</TextItem>
                        </Button>
                        <Button onPress={()=> navigation.goBack()} style={[styles.btnAction, styles.btnBatal]}>
                            <TextItem style={[styles.textBtn, styles.textBatal]}>{strings.btn_batal}</TextItem>
                        </Button>
                    </View>
                </View>
            </DummyFlatList>
        </Base>
    )
}
