import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootPaper: {
            width: '300px',
            color: '#fff',
            backgroundColor: "rgba(13, 13, 13, 0.8)",
            borderRadius: '0',
            margin: '20px',
        },
        rootBtn: {
            color: '#fff',
            backgroundColor: '#595959',
            minWidth: '30px',
            borderRadius: '0',
            '&:hover':{
                backgroundColor: '#0a00f5',
            }
        },
        rootBtnDelete: {
            color: '#595959',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }
        },
        rootCheckBox: {
            padding: '10px',
            color: '#fff',
            '.Mui-checked&':{
                color:'#0a00f5'
            },
            '&:hover':{
                backgroundColor: 'rgba(10, 0, 245, 0.3)'
            },
            '.MuiCheckbox-colorSecondary&:hover':{
                backgroundColor: 'rgba(10, 0, 245, 0.3)'
            },

        },
        rootBtnGroup:{
            borderRadius: '0',

            textTransform: 'uppercase',
            backgroundColor: '#595959',
            '&:hover':{

                backgroundColor: '#0a00f5',
            },
            '&.MuiButton-contained':{
                color: 'black',
                backgroundColor: '#0a00f5'
            },
            '&.MuiButton-root':{
                fontWeight: 'bold',
                letterSpacing: '2px',
                color: '#fff'

            }
        },
        rootInput:{
            width: '70%',
            '& .MuiInputBase-root':{
                color: '#fff',
                fontSize: '16px'
            },
            '& .MuiInput-underline:before': {
                borderBottom: '1px solid #fff'
            },
            '& .MuiInput-underline:hover:before': {
                borderBottom: '1px solid #595959',

            },
            '& .MuiInput-formControl': {
                color: '#fff',

            },
            '& .MuiInputLabel-formControl':{
                color: '#fff',
                fontSize: '16px'
            },
            '& label.Mui-focused': {
                color: '#0a00f5',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#0a00f5',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#595959',
                },
                '&:hover fieldset': {
                    borderColor: '#0a00f5',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#0a00f5',
                },
            },
        },
    }),
);

