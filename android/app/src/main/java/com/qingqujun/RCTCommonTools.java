package com.qingqujun;

import android.app.Application;
import android.content.Intent;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by ruanxiaoquan on 16/7/19.
 */
public class RCTCommonTools extends ReactContextBaseJavaModule {

    public RCTCommonTools(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RCTCommonTools";
    }

    @ReactMethod
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        getCurrentActivity().startActivity(intent);
    }
}
