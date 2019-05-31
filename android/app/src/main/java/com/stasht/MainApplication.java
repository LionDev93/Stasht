package com.stasht;

import android.app.Application;

import com.facebook.react.ReactApplication;
import im.shimo.react.cookie.CookieManagerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

import org.reactnative.camera.RNCameraPackage;
import com.lynxit.contactswrapper.ContactsWrapperPackage;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CookieManagerPackage(),
            new RNCWebViewPackage(),
            // new FBSDKPackage(),
            new ReactNativeContacts(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new LinearGradientPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new ContactsWrapperPackage(),
            new FBSDKPackage(mCallbackManager)
            
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
