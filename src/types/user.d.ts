type User = {
  name: string;
  email: string;
  role: UserRoles;
  profileImage: string;
};

type UserRoles = 'CUSTOMER' | 'RENTER';
