package com.example.navik;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        Log.d("MainActivity", "onCreate started");
        
        try {
            // Hide the action bar/title bar
            if (getSupportActionBar() != null) {
                getSupportActionBar().hide();
            }
            
            setContentView(R.layout.activity_main);
            Log.d("MainActivity", "Layout set successfully");
            
            setupWebView();
            loadHomePage();
            
            Log.d("MainActivity", "onCreate completed successfully");
        } catch (Exception e) {
            Log.e("MainActivity", "Error in onCreate: " + e.getMessage(), e);
            throw e;
        }
    }

    private void setupWebView() {
        Log.d("MainActivity", "Setting up WebView");
        
        try {
            webView = findViewById(R.id.webview);
            if (webView == null) {
                Log.e("MainActivity", "WebView not found in layout!");
                return;
            }
            
            // Enable JavaScript
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setDomStorageEnabled(true);
            webSettings.setLoadWithOverviewMode(true);
            webSettings.setUseWideViewPort(true);
            webSettings.setBuiltInZoomControls(true);
            webSettings.setDisplayZoomControls(false);
            webSettings.setSupportZoom(true);
            webSettings.setDefaultTextEncodingName("utf-8");
            
            // Allow file access
            webSettings.setAllowFileAccess(true);
            webSettings.setAllowContentAccess(true);
            
            // Allow external resources but handle failures gracefully
            webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            webSettings.setAllowFileAccessFromFileURLs(true);
            
            Log.d("MainActivity", "WebView settings configured");
            
            // Set WebViewClient to handle page navigation
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    String url = request.getUrl().toString();
                    Log.d("MainActivity", "Loading URL: " + url);
                    
                    // Allow internal asset files
                    if (url.startsWith("file:///android_asset/")) {
                        return false; // Let WebView handle it
                    }
                    
                    // Allow external resources (CSS, JS, fonts) but block navigation
                    if (url.startsWith("https://") && 
                        (url.contains("cdn.tailwindcss.com") || 
                         url.contains("cdnjs.cloudflare.com") || 
                         url.contains("fonts.googleapis.com"))) {
                        return false; // Allow external resources
                    }
                    
                    return true; // Block other external URLs
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);
                    Log.d("MainActivity", "Page finished loading: " + url);
                }
                
                @Override
                public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                    super.onReceivedError(view, request, error);
                    Log.e("MainActivity", "WebView error: " + error.getDescription());
                }
            });
            
            Log.d("MainActivity", "WebView setup completed");
        } catch (Exception e) {
            Log.e("MainActivity", "Error setting up WebView: " + e.getMessage(), e);
            throw e;
        }
    }

    private void loadHomePage() {
        // Load the original beautiful index.html
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
