import { Amage, Base, Button, HeaderListening, TextItem } from '../../components';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import styles from './styles';
import { colors, neutralColor, pages, primaryColor, snackState as ss, strings } from '@constants';
import { Slider } from '@miblanchard/react-native-slider';
import { File, Pause, Play, RotateCcw, RotateCw, SkipBack, SkipForward, Video } from '@assets';

const TotalTime = 230;

export default function Listening({ navigation }: any) {

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [time, setTime] = useState(0)
  const [play, setPlay] = useState(false)

  const convertTime = () => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(TotalTime);
    var date = t.toISOString();
    date = date.replace('T', ' ');
    console.log(date)
  }

  const navigationTopBar = (type = '') => {
    switch (type) {
      case 'reading':
        navigation.navigate(pages.Listening)
        break;
      case 'listening':
        navigation.navigate(pages.Listening)
        break;
      case 'watching':
        navigation.navigate(pages.Listening)
        break;
    
      default:
        break;
    }
  }
    
  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <HeaderListening
        navigation={navigation}
        onShare={()=> console.log('share')}
      />
      <View style={styles.content}>
        <View style={styles.boxImage}>
          <Amage resizeMode='contain' />
        </View>
        <TextItem style={[styles.text, styles.title]}>The Psychology of Money</TextItem>
        <TextItem style={[styles.text]}>Morgan Housel</TextItem>
        <View>
          <Slider
            containerStyle={styles.SliderContainer}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={neutralColor[90]}
            maximumTrackTintColor={'#D1D7E1'}
            thumbTintColor={colors.white}
            trackStyle={styles.trackSliderStyle}
            onSlidingComplete={()=>convertTime()}
          />
          <View style={styles.boxTextTime}>
            <TextItem>00:00</TextItem>
            <TextItem>00:00</TextItem>
          </View>
        </View>
        <View style={styles.boxAction}>
          <Button>
            <RotateCcw color={neutralColor[90]} />
          </Button>
          <Button>
            <SkipBack color={neutralColor[90]} />
          </Button>
          <Button onPress={()=> setPlay(!play)} style={styles.play}>
            {
              play ?
              <Pause color={primaryColor.main}/>
              :
              <Play color={primaryColor.main} style={styles.iconPlay} />
            }
          </Button>
          <Button>
            <SkipForward color={neutralColor[90]} />
          </Button>
          <Button>
            <RotateCw color={neutralColor[90]} />
          </Button>
        </View>
        <View style={styles.boxFooter}>
          <TextItem style={styles.speedText}>Kecepatan 1.0x</TextItem>
          <View style={styles.SelectBar}>
            <Button onPress={()=> navigationTopBar('reading')} style={styles.btnBar}>
              <File />
              <TextItem style={styles.titleSelect}>{strings.baca}</TextItem>
            </Button>
            <Button onPress={()=> navigationTopBar('watching')} style={styles.btnBar}>
              <Video />
              <TextItem style={styles.titleSelect}>{strings.tonton}</TextItem>
            </Button>
          </View>
        </View>
      </View>
    </Base>
  )
}
