import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function SigninPage() {
  const navigate = useNavigate();
  const { signin, error, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const success = await signin(data.email, data.password);
    if (success) {
      navigate('/app');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>Welcome Back</h2>

        {error && <p className="error">{error}</p>}

        <input {...register('email')} placeholder="Email" />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>

        <p>
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </form>
    </div>
  );
}