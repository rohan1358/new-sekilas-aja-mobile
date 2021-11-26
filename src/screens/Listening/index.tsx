import { Amage, Base, Button, DummyFlatList, HeaderListening, TextItem } from '../../components';
import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native';
import styles from './styles';
import { colors, neutralColor, pages, primaryColor, snackState as ss, strings } from '@constants';
import { Slider } from '@miblanchard/react-native-slider';
import { Exit, File, Pause, Play, RotateCcw, RotateCw, SkipBack, SkipForward, Video } from '@assets';
import TextTicker from 'react-native-text-ticker'
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { heightPercent } from '../../helpers/helper';
import { speedList } from './dummy';

const TotalTime = 230;

export default function Listening({ navigation }: any) {

  const refRBSheet = useRef();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [time, setTime] = useState(0)
  const [play, setPlay] = useState(false)
  const [speed, setSpeed] = useState(1.0)

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
        navigation.navigate(pages.Watching)
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
        onShare={() => console.log('share')}
        title='Bab 3 : Tak Pernah Cukup'
      />
      <View style={styles.content}>
        <View style={styles.boxImage}>
          <Amage resizeMode='contain' />
        </View>
        <View style={styles.containerTitle}>
          <LinearGradient
              colors={[primaryColor.main, 'rgba(251, 207, 50, 0.5)', 'transparent']}
                useAngle={ true}
                angle={45}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={styles.gradientLeft}
            />
          <TextTicker
            duration={6000}
            loop
            scroll
            repeatSpacer={20}
            marqueeDelay={1}
          >
              <TextItem style={[styles.text, styles.title]}>The Psychology of Money</TextItem>
          </TextTicker>
          <LinearGradient
            colors={['transparent', 'rgba(251, 207, 50, 0.5)', primaryColor.main]}
            useAngle={ true}
            angle={45}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={styles.gradientRight}
          />
        </View>
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
            <RotateCcw height={25} color={neutralColor[90]}/>
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
            <RotateCw height={25} color={neutralColor[90]} />
          </Button>
        </View>
        <View style={styles.boxFooter}>
          <Button onPress={()=> refRBSheet.current.open()}>
            <TextItem style={styles.speedText}>{strings.kecepatan+ speed.toString() +strings.x}</TextItem>
          </Button>
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
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        }}
        height={heightPercent(42)}
      >
        <View>
          <View style={styles.boxTitleSheet}>
            <TextItem style={styles.titleSheet}>{strings.kecepatan_audio}</TextItem>
            <Button onPress={()=> refRBSheet.current.close()}>
              <Exit color={neutralColor[90]} />
            </Button>
          </View>
          <DummyFlatList>
            <View style={styles.boxListSpeed}>
              {
                speedList.map((item, index) => (
                  <Button onPress={() => {
                    refRBSheet.current.close()
                    setTimeout(() => {
                      setSpeed(item)
                    }, 1200);
                  }} key={index} style={styles.listSpeed}>
                    <TextItem type={'r.16.nc.90'}>{ item+strings.x}</TextItem>
                  </Button>
                ))
              }
            </View>
          </DummyFlatList>
        </View>
      </RBSheet>
    </Base>
  )
}
