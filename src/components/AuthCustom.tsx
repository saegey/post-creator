import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Text } from 'theme-ui';

const AuthCustom = ({ children }) => {
  console.log('auth custooom');
  return (
    <Authenticator
      signUpAttributes={['name', 'preferred_username']}
      components={{
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
              <>
                <Text as='h2' sx={{ color: 'text' }}>
                  monopad
                </Text>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />

                {/* Append & require Terms & Conditions field to sign up  */}
              </>
            );
          },
        },
      }}
    >
      {children}
    </Authenticator>
  );
};

export default AuthCustom;
