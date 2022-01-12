package com.sekilasaja;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; // here 

// orientate 
import android.content.Intent; // <--- import 
import android.content.res.Configuration; // <--- import 

public class MainActivity extends ReactActivity {

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
