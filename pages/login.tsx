import { NextPage } from 'next';
import tw from 'twin.macro';

const Login: NextPage = () => {
  return (
    <div css={tw`flex min-h-screen flex-col items-center justify-center py-2`}>
      Login Page!
    </div>
  );
};

export default Login;