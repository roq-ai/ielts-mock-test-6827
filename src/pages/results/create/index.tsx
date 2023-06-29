import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createResult } from 'apiSdk/results';
import { Error } from 'components/error';
import { resultValidationSchema } from 'validationSchema/results';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TestInterface } from 'interfaces/test';
import { UserInterface } from 'interfaces/user';
import { getTests } from 'apiSdk/tests';
import { getUsers } from 'apiSdk/users';
import { ResultInterface } from 'interfaces/result';

function ResultCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ResultInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createResult(values);
      resetForm();
      router.push('/results');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ResultInterface>({
    initialValues: {
      score: 0,
      test_id: (router.query.test_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: resultValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="score" mb="4" isInvalid={!!formik.errors?.score}>
            <FormLabel>Score</FormLabel>
            <NumberInput
              name="score"
              value={formik.values?.score}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('score', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.score && <FormErrorMessage>{formik.errors?.score}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TestInterface>
            formik={formik}
            name={'test_id'}
            label={'Select Test'}
            placeholder={'Select Test'}
            fetcher={getTests}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'result',
    operation: AccessOperationEnum.CREATE,
  }),
)(ResultCreatePage);
