import * as yup from 'yup';

export const resultValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  test_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
