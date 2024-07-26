import { StyleSheet, Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

export default function App() {
  const signIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log({
        id: credential.identityToken,
        authorization_code: credential.authorizationCode,
      });
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        console.log("something went wrong");
      } else {
        // handle other errors
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Omash app, please sign In</Text>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={signIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
  text: {
    marginBottom: 12,
    fontSize: 16,
  },
});
