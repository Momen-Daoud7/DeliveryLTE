exports.protect = async (req,res,next) => {
	if(!req.session.user || req.session.user.useStatus == false) {
		return res.redirect('/login')
	}else {
		next()
	}

}

exports.canNotLogin = async (req,res,next) => {
	if(req.session.user) {
		return res.redirect('ships')
	}else {
		next()
	}
}

exports.authorize = (...roles) => {
	return (req,res,next) => {
		if(!roles.includes(req.session.user.role)) {
			if (req.session.user.role == 'captin') {
				return res.redirect('/ships/withCaptin')
			}
			return res.redirect('/ships')
		}
		next()
	}
}