import React from 'react';
import {SafeAreaView,KeyboardAvoidingView,Platform,ScrollView,} from 'react-native';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import LoginFooter from './LoginFooter';
import { loginStyles } from './LoginStyles';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignUp, onForgotPassword }) => {
  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <LoginHeader />
          
          <LoginForm 
            onLogin={onLogin}
            onForgotPassword={onForgotPassword}
          />
          
          <SocialLogin />
          
          <LoginFooter onSignUp={onSignUp} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;