type SignUpFormIfc = {
  name: string;
  email: string;
  password: string;
};

interface ErrorFormIfc {
  field: string;
  message: string;
  state: string;
}
