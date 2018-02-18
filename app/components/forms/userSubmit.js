import { userSettingsUpdate } from '../../actions/userActions'

function userSubmit(values, dispatch) {
  if(values.affectiveData == null){
    values.emailSub = '0'
  }
  if(values.emailSub == null){
    values.emailSub = '0'
  }
  if(values.interfaceComplexity == null){
    values.emailSub = '0'
  }

  dispatch(userSettingsUpdate(values));
}

export default userSubmit
