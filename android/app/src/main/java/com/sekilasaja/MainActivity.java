package com.sekilasaja;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; // here 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // here
    // SplashScreen.show(this, R.style.SplashScreenTheme);
    super.onCreate(null);
  }

  @Override
  protected String getMainComponentName() {
    return "sekilasaja";
  }
}
