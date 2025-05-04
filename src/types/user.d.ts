type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
  profileImage: string;
};

type UserRoles = 'CUSTOMER' | 'RENTER';
