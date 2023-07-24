// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { Stack } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useConfirm } from "material-ui-confirm";



const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()

  // 确认提示框
  const confirm = useConfirm();


  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        {/* <ReactApexcharts type='bar' height={205} options={options} series={[{ data: [37, 57, 45, 75, 57, 40, 65] }]} /> */}
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant='body2'>Your sales performance is 45% 😎 better compared to last month</Typography>
        </Box>
        <Stack spacing={1}>
          <Button fullWidth variant='contained'>
            按钮
          </Button>
          <Button fullWidth variant='contained' onClick={() => {
            enqueueSnackbar({
              variant: "error",
              message: `这是一个错误的提示框`,
            });
          }}>
            Tip（提示框）
          </Button>
          <Button fullWidth variant='contained'
            onClick={() => {
              confirm({
                title: "确认框",
                description:
                  "确认框描述",
                confirmationText: "确认",
                cancellationText: "取消",
              })
                .then(() => {
                  enqueueSnackbar({
                    message: "用户点击确认",
                    variant: "info",
                  });
                })
                .catch(() => {
                  enqueueSnackbar({
                    message: "用户取消操作",
                    variant: "info",
                  });
                });
            }}
          >
            Confirm（确认框）
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
