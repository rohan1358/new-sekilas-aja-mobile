package com.sekilasaja;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

// testing android 8
import org.devio.rn.splashscreen.SplashScreen; // here 

// orientate 
import android.content.Intent; // <--- import 
import android.content.res.Configuration; // <--- import 

public class MainActivity extends ReactActivity {

  // start function splash screen
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // here
    super.onCreate(savedInstanceState);
  }
  // end function splash screen

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */

  @Override
  protected String getMainComponentName() {
    return "sekilasaja";
  }
}
