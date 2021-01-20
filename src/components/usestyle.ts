import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootPaper: {
            width: '350px',
            color: '#fff',
            backgroundColor: "rgba(13, 13, 13, 0.8)",
            borderRadius: '5px',
            margin: '20px',
        },
        rootBtn: {
            color: '#ffffff',
            backgroundColor: '#AFB1B3',
            borderRadius: '0 5px 5px 0',
            marginBottom: '-12px',
            '&:hover':{
                backgroundColor: '#3F51B5',
            }
        },
        closeBtn:{
            color: '#ffffff',
            padding: '0',
            '&:hover':{
                backgroundColor: 'transparent',
                color: '#d4001b',
            },
            '&.MuiButton-root':{
                minWidth: '10px',

            }
        },
        rootBtnDelete: {
            color: '#ffffff',
            '&.MuiIconButton-root':{
                color: '#afb1b3'
            },
            '&.MuiIconButton-root:hover': {
                backgroundColor: 'rgb(15,28,81)'
            }
        },
        rootCheckBox: {
            '.MuiCheckbox-root&': {
                padding: '10px',
                color: '#fff',
            },
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
            '&.MuiButton-outlinedPrimary':{
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        rootInput:{
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

