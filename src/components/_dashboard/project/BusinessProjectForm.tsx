import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { DatePicker, LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Chip,
  Stack,
  Switch,
  Button,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box
} from '@mui/material';
// utils
import { useNavigate } from 'react-router-dom';
// @types
import { NewProjectFormValues } from '../../../@types/krowd/project';

//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
import BlogNewPostPreview from './BlogNewPostPreview';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getFieldList } from 'redux/slices/krowd_slices/field';
import { getAreasList } from 'redux/slices/krowd_slices/area';
import Autocomplete from '@mui/material/Autocomplete';
import { PATH_DASHBOARD } from 'routes/paths';
import axios from 'axios';
import { fDateTimeSuffix } from 'utils/formatTime';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BusinessProjectForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const { areaList } = useSelector((state: RootState) => state.areaKrowd);
  const currentTime = fDateTimeSuffix(new Date(Date.now()));
  const [valueMin, setValueMin] = useState<Date | null>(new Date(Date.now()));
  const [value, setValue] = useState<Date | null>(new Date(Date.now()));
  const [valueEndDate, setValueEndDate] = useState<Date | null>(new Date(''));
  const [valueMaxDate, setMaxDate] = useState<Date | null>(new Date('2030-12-31 12:00:00'));
  const [date, setDateExpress] = useState('');
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    setFieldValue('startDate', fDateTimeSuffix(newValue!));
    console.log(formik);
  };
  const handleChangeEndDate = (newValue2: Date | null) => {
    setValueEndDate(newValue2);
    setFieldValue('endDate', fDateTimeSuffix(newValue2!));
    console.log(formik);
  };
  useEffect(() => {
    dispatch(getFieldList());
    dispatch(getAreasList());
  }, [dispatch]);

  const handleOpenPreview = () => {
    navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd);
  };

  const handleClosePreview = () => {
    navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd);
  };

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Y??u c???u nh???p t??n'),
    businessId: Yup.string().required('Y??u c???u nh???p doanh nghi???p'),
    managerId: Yup.string().required('Y??u c???u nh???p ng?????i qu???n l??'),
    fieldId: Yup.string().required('Y??u c???u nh???p l??nh v???c'),
    areaId: Yup.string().required('Y??u c???u nh???p khu v???c'),
    address: Yup.string().required('Y??u c???u nh???p ?????a ch???'),
    description: Yup.string().min(10).required('Y??u c???u nh???p m?? t???'),
    investmentTargetCapital: Yup.string().required('Y??u c???u nh???p v???n m???c ti??u ?????u t??'),
    investedCapital: Yup.string().required('Y??u c???u nh???p v???n ?????u t??'),
    sharedRevenue: Yup.string().required('Y??u c???u nh???p doanh thu ???????c chia s???'),
    multiplier: Yup.string().required('Y??u c???u nh???p h??? s??? nh??n'),
    duration: Yup.string().required('Y??u c???u nh???p th???i h???n'),
    numOfStage: Yup.string().required('Y??u c???u nh???p s??? k???'),
    businessLicense: Yup.string().required('Y??u c???u nh???p m?? doanh nghi???p'),
    startDate: Yup.string().required('Y??u c???u nh???p ng??y t???o'),
    endDate: Yup.string().required('Y??u c???u nh???p ng??y k???t th??c'),
    image: Yup.mixed().required('Y??u c???u nh???p ???nh')
  });

  const formik = useFormik<NewProjectFormValues>({
    initialValues: {
      name: '',
      businessId: '9E74278A-F610-11EC-B939-0242AC120002',
      managerId: '00A551DC-0781-11ED-B939-0242AC120002',
      fieldId: '',
      areaId: '',
      address: '',
      description: '',
      investmentTargetCapital: '',
      investedCapital: '',
      sharedRevenue: '',
      multiplier: '',
      duration: '',
      numOfStage: '',
      businessLicense: '',
      startDate: currentTime,
      endDate: '',
      image: null
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('businessId', '9E74278A-F610-11EC-B939-0242AC120002');
        formData.append('managerId', '00A551DC-0781-11ED-B939-0242AC120002');
        formData.append('name', values.name);
        formData.append('fieldId', values.fieldId);
        formData.append('areaId', values.areaId);
        formData.append('address', values.address);
        formData.append('description', values.description);
        formData.append('investmentTargetCapital', values.investmentTargetCapital);
        formData.append('investedCapital', values.investedCapital);
        formData.append('sharedRevenue', values.sharedRevenue);
        formData.append('multiplier', values.multiplier);
        formData.append('duration', values.duration);
        formData.append('startDate', values.startDate);
        formData.append('endDate', values.startDate);
        formData.append('numOfStage', values.numOfStage);
        formData.append('businessLicense', values.businessLicense);
        formData.append('image', values.image);
        await fetch(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects`,
          { method: 'POST', mode: 'cors', body: formData }
        );
        console.log('fromdata', values.name);
        resetForm();
        setSubmitting(true);
        enqueueSnackbar('T???o m???i th??nh c??ng', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  console.log(formik);

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       setFieldValue('image', {
  //         ...file,
  //         preview: URL.createObjectURL(file)
  //       });
  //     }
  //   },
  //   [setFieldValue]
  // );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <LabelStyle>D??? ??n</LabelStyle>

                  <TextField
                    sx={{ legend: { span: { mt: 1 } } }}
                    label="T??n"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="M?? doanh nghi???p"
                    {...getFieldProps('businessLicense')}
                    error={Boolean(touched.businessLicense && errors.businessLicense)}
                    helperText={touched.businessLicense && errors.businessLicense}
                  />
                  <TextField
                    fullWidth
                    label="?????a ch???"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <Stack spacing={3}>
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => {
                        setFieldValue('areaId', newValue);
                      }}
                      options={areaList.map((option) => option.id)}
                      renderInput={(params) => <TextField {...params} label="Khu v???c" />}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label="M?? t??? th??ng tin"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <div>
                    <LabelStyle sx={{ py: 1 }}>???nh</LabelStyle>
                    <TextField fullWidth type={'file'} {...getFieldProps('image')} />
                    {/* <TextField
                      type="file"
                      name="images"
                      id="imgid"
                      className="imgcls"
                    /> */}
                    {/* <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.image}
                      onDrop={handleDrop}
                      error={Boolean(touched.image && errors.image)}
                    />
                    {touched.image && errors.image && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.image && errors.image}
                      </FormHelperText>
                    )} */}
                  </div>
                  <LabelStyle sx={{ py: 1 }}>Th???i gian k??u g???i</LabelStyle>
                  <Grid container>
                    <Grid xs={12} md={6}>
                      <DatePicker
                        label="Ng??y b???t ?????u"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        minDate={valueMin!}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <DatePicker
                        label="Ng??y k???t th??c"
                        inputFormat="dd/MM/yyyy"
                        value={valueEndDate}
                        minDate={value!}
                        maxDate={valueMaxDate!}
                        onChange={handleChangeEndDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <LabelStyle sx={{ pb: 1 }}>Doanh thu</LabelStyle>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="V???n ?????u t??"
                    {...getFieldProps('investedCapital')}
                    error={Boolean(touched.investedCapital && errors.investedCapital)}
                    helperText={touched.investedCapital && errors.investedCapital}
                  />
                  <TextField
                    fullWidth
                    label="Doanh thu chia s???"
                    {...getFieldProps('sharedRevenue')}
                    error={Boolean(touched.sharedRevenue && errors.sharedRevenue)}
                    helperText={touched.sharedRevenue && errors.sharedRevenue}
                  />
                  <TextField
                    fullWidth
                    label="M???c ti??u v???n ?????u t??"
                    {...getFieldProps('investmentTargetCapital')}
                    error={Boolean(
                      touched.investmentTargetCapital && errors.investmentTargetCapital
                    )}
                    helperText={touched.investmentTargetCapital && errors.investmentTargetCapital}
                  />
                  <TextField
                    fullWidth
                    label="S??? k???"
                    {...getFieldProps('numOfStage')}
                    error={Boolean(touched.numOfStage && errors.numOfStage)}
                    helperText={touched.numOfStage && errors.numOfStage}
                  />
                  <TextField
                    fullWidth
                    label="H??? s??? nh??n"
                    {...getFieldProps('multiplier')}
                    error={Boolean(touched.multiplier && errors.multiplier)}
                    helperText={touched.multiplier && errors.multiplier}
                  />
                  <TextField
                    fullWidth
                    label="Th???i h???n"
                    {...getFieldProps('duration')}
                    error={Boolean(touched.duration && errors.duration)}
                    helperText={touched.duration && errors.duration}
                  />
                </Stack>
              </Card>
              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    multiple
                    freeSolo
                    onChange={(event, newValue) => {
                      setFieldValue('businessId', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                        />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Business" />}
                  />
                </Stack>
              </Card> */}
              {/* <Card sx={{ p: 3 }}>
                <LabelStyle sx={{ pb: 1 }}>Qu???n l??</LabelStyle>
                <Stack spacing={3}>
                  <Autocomplete
                    multiple
                    freeSolo
                    onChange={(event, newValue) => {
                      setFieldValue('managerId', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ng?????i s??? h???u d??? ??n"
                        error={Boolean(touched.managerId && errors.managerId)}
                        helperText={touched.managerId && errors.managerId}
                      />
                    )}
                  />
                </Stack>
              </Card> */}

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    freeSolo
                    onChange={(event, newValue) => {
                      setFieldValue('fieldId', newValue);
                    }}
                    options={fieldList.listOfField.map((option) => option.id)}
                    // options={fieldList}
                    // options={fieldList.map((option) => option.id)}
                    // getOptionLabel={(option) => option.name}
                    // renderOption={(props, option) => (
                    //   <Box component="li" {...props}>
                    //     {option.name}
                    //   </Box>
                    // )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="L??nh v???c"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              fullWidth
              type="button"
              color="inherit"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
              sx={{ mr: 1.5 }}
            >
              Cancel
            </Button>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              T???o m???i
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview
        formik={formik}
        isOpenPreview={open}
        onClosePreview={handleClosePreview}
      /> */}
    </>
  );
}
