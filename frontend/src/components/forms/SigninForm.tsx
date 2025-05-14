import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from '../../utils/validators';
import * as yup from 'yup';


type FormData = yup.InferType<typeof signinSchema>;

interface SigninFormProps {
  onSubmit: (data: FormData) => void;
  error?: string | null;
  loading?: boolean;
}

export default function SigninForm({ onSubmit, error, loading }: SigninFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signinSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Welcome Back</h2>

      {error && <p className="form-error">{error}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <span className="form-error">{errors.email.message?.toString()}</span>}

      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <span className="form-error">{errors.password.message?.toString()}</span>}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Sign In'}
      </button>
    </form>
  );
}