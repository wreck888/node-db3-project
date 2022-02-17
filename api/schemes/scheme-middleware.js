const Scheme = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  const scheme = await Scheme.findById(scheme_id);
  try {
    if (!scheme_id || scheme_id === '') {
      next({ 
        status: 404, message: `scheme with scheme_id ${scheme_id} not found`
      })
    } else {
      req.scheme = scheme;
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    const { scheme_name } = req.body
    
    if ( !scheme_name || typeof scheme_name !== "string" ) {
      next({ 
        status: 400, message: "invalid scheme_name"
      })
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body

    if( !instructions || instructions === "" || typeof instructions !== "string" ||
      step_number < 1 || typeof step_number !== "number") {
        next({ 
          status: 400, message: "invalid step"
        })
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
