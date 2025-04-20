type User = {
  name: string;
  email: string;
  role: UserRoles;
};

type UserRoles = 'CUSTOMER' | 'RENTER';
