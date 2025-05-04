type AuthLoginFunction = (props: { email: string; password: string }) => Promise<boolean>;

type AuthRegisterFunction = (props: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: File;
}) => Promise<boolean>;

type AuthLogoutFunction = () => void;
