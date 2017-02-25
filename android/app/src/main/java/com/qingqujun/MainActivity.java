package com.qingqujun;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.mehcode.reactnative.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "qingqujun";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //SplashScreen.show(this, getReactInstanceManager());
        super.onCreate(savedInstanceState);
    }
}
