import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


// Validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().min(3, 'Name must be at least 3 characters').required(),
  password: yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character')
    .required(),
});

type FormData = yup.InferType<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, error, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const success = await signup(data.email, data.name, data.password);
    if (success) {
      navigate('/signin');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>Create an Account</h2>

        {error && <p className="error">{error}</p>}

        <input {...register('email')} placeholder="Email" />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <input {...register('name')} placeholder="Full Name" />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>

        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}