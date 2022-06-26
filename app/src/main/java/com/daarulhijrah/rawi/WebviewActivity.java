package com.daarulhijrah.rawi;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebView;

public class WebviewActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);

        WebView mywebview = (WebView) findViewById(R.id.webView);
//        mywebview.loadUrl("https://rawi.daarulhijrah.com");
        mywebview.loadUrl("file:///android_asset/index.html");

    }
}