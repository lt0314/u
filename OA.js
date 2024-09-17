javascript: (function ($) {
	var _ = $.prototype;
	_.TOP = function () {
		for (var t = this, d = -999, r = 0, i = 0, k; i < t.length; i++) {
			k = t[i].style['z-index'];
			if (d < k) {
				d = k;
				r = i
			}
		};
		return t.eq(r)
	};
	_.V = function (v) {
		return this.val(v).trigger('blur').trigger('change').trigger('input')
	};
	_.FILTER = function (label) {
		var z;
		z = $(this).filter(function (i, u) {
				var re = new RegExp(label.replace('*', '.*'), 'img'),
				a = $('.h3-panel-header,.field__label,.ctrl,a,:button,label', u).eq(0),
				t = a.length ? a : $(u),
				v = [(t.text() + '').replace('*', '').trim(), (t.val() + '').replace('*', '').trim(), (t[0].placeholder + '').replace('*', '').trim()];
				return label.indexOf('*') + 1 ? (re.test(v[0]) || re.test(v[1]) || re.test(v[2])) : (v[0] == label || v[1] == label || v[2] == label)
			});
		if (z.length == 0) {
			try {
				z = $(this).filter(label);
			} catch (e) {
				z = $(this).filter(':contains(' + label + ')');
			}
		};
		return z
	};
	$.P = function (c) {
		var p,
		q,
		s,
		d = document;
		try {
			p = $('iframe').contents().add(d)
		} catch (e) {
			p = $(d)
		};
		if (c) {
			s = c.split('>');
			q = $('*:visible', p).FILTER(s[0]);
			return s[1] ? q.NEAR($('*:visible', p).FILTER(s[1]), 'br') : q.next()
		} else {
			return p
		}
	};
})(jQuery);
(function ($) {
	var _ = $.prototype;
	_.NEAR = function (sel, direc) {
		var m0 = $(this),
		p0 = m0.offset(),
		l0 = p0.left,
		t0 = p0.top,
		r0 = l0 + m0.width(),
		b0 = t0 + m0.height(),
		d = {},
		dir = '',
		w = Math.pow,
		a = parseFloat,
		u = 'ul' == (sel + '').toLowerCase(),
		s = $(sel);
		u && s.toggle(1);
		s.each(function () {
			var m = $(this),
			p = m.offset(),
			l = p.left,
			t = p.top,
			r = l + m.width(),
			b = t + m.height(),
			j,
			x,
			y;
			if (r0 <= l) {
				if (t >= b0) {
					j = w(w(r0 - l, 2) + w(b0 - t, 2), 0.5);
					dir = 'rb'
				} else if (b <= t0) {
					j = w(w(r0 - l, 2) + w(b - t0, 2), 0.5);
					dir = 'rt'
				} else {
					j = l - r0;
					dir = 'r'
				}
			} else if (l0 >= r) {
				if (t >= b0) {
					j = w(w(r - l0, 2) + w(b0 - t, 2), 0.5);
					dir = 'lb'
				} else if (b <= t0) {
					j = w(w(r - l0, 2) + w(b - t0, 2), 0.5);
					dir = 'lt'
				} else {
					j = l0 - r;
					dir = 'l'
				}
			} else if (r0 >= r && l0 <= l) {
				if (t >= b0) {
					j = t - b0;
					dir = 'b'
				} else if (b <= t0) {
					j = t0 - b;
					dir = 't'
				} else if (t0 <= t && b0 >= b) {
					j = -1;
					dir = 'in'
				} else {
					j = -0.5;
					dir = 'inter'
				}
			} else {
				if (t0 <= t && b0 >= b) {
					j = -1;
					dir = 'inter'
				} else {
					j = 0.5;
					dir = 'out'
				}
			};
			m.attr('dist', j).attr('direc', dir);
			d[dir] ? a(d[dir].attr('dist')) > j && (d[dir] = m) : d[dir] = m
		});
		u && s.toggle(1);
		var z = s = 9e9,
		br = e = es = null;
		$.each(d, function (i, v) {
			var d = v.attr('direc'),
			t = a(v.attr('dist'));
			v && t < s && (e = v, s = t, es = es ? es.add(v) : v);
			v && t < z && (d == 'r' || d == 'b' || d == 'rb' || d == 'lb') && (br = v)
		});
		d['br'] = br;
		d['ltrb'] = e;
		d['all'] = es;
		return d[direc || 'ltrb'];
	};
	$('body').attr('ccc', 'ok')
})(jQuery);
(function (_) {
	_.DO = function () {
		this.L = [],
		this.R = [],
		this.times = 999;
		setTimeout(function (m) {
			m.run()
		}, 0, this)
	};
	DO.prototype = {
		constructor: DO,
		add: function () {
			var that = this;
			for (var e = arguments, n = e.length, i = 0; i < n; i++) {
				var fn = (function (e) {
					return function () {
						var r = [];
						console.log(e.toString());
						e(r);
						setInterval1(function (id) {
							r[0] != undefined && (clearInterval(id), that.L.length || (that.R[0] = r[0]), that.run())
						}, function () {
							that.L.length || (that.R[0] = r[0]);
						}, 33, {
							times: that.times
						})
					}
				})(e[i]);
				that.L.push(fn)
			};
			return that
		},
		run: function () {
			var fn = this.L.shift();
			fn && fn();
		}
	};
	_.setInterval1 = function (sucfun, timeoutFun, intertime, tm) {
		tm = tm || {
			timeout: 60000
		};
		setTimeout(function () {
			var id = setInterval(function () {
					sucfun(id)
				}, intertime);
			setTimeout(function () {
				clearInterval(id);
				timeoutFun()
			}, tm.times * intertime || tm.timeout);
		}, tm.delay || 1);
	};
	_.D = function (ar) {
		var d = new DO;
		ar.forEach(function (v) {
			d.add(function (r) {
				Doit(v[0], v[1], v[2], r)
			})
		});
		d.add(function (r) {
			setTimeout(function () {
				$('body').attr('ccc', d.R[0] == 2 ? 'stop' : 'ok');
				r[0] = 1
			}, 1)
		})
	};
	_.Doit = function (label, value1, value2, rr, tm) {
		var v1 = vv(value1),
		v2 = vv(value2),
		n = label.indexOf('>') + 1,
		p = $.P(n ? label : ''),
		doc = $('div[id*=_dialog_]:visible', p).TOP()[0] || p,
		L = n ? label.split('>')[1] : label;
		if (undefined == v1) {
			click(doc, p, L, rr)
		} else if (undefined == v2) {
			setValue(doc, p, L, v1, rr, tm || 33)
		} else {
			var el = $('label', doc).FILTER(L);
			if (el.next().find('.glyphicon-list')[0]) {
				Dvalues(el, value1, value2, rr)
			} else {
				setPhoneMoney(doc, p, L, v1, v2, rr)
			}
		}
	};
	_.vv = function (value) {
		return value && (typeof(value) == 'object' ? value : value.split('|'))
	}
})(window);
(function (_) {
	var vdm = 'div[id*=_dialog_]:visible';
	_.click = function (doc, p, b, rr) {
		var a,
		c,
		vd = $(vdm, p).length,
		d = $('a,:button,span', doc).FILTER(b).TOP();
		d.length ? d[0].click() : (a = $('input', doc).FILTER(b), c = a.next(':button')[0], c ? c.click() : (c = a.next().find(':button,a')[0], c && c.click()));
		setTimeout(function () {
			if (rr) {
				rr[0] = 1
			}
		})
	};
	_.setValue = function (doc, p, b, value, rr, tm) {
		var a,
		ne = $('label', doc).FILTER(b).next();
		ne = ne[0] ? ne : $('label', p).FILTER(b).next();
		ne.length || (a = $('input,textarea', p).FILTER(b), a.length && a.V(value).next().find('a').click());
		if (a && a.length) {
			if (rr) {
				rr[0] = 1
			};
			return
		};
		var fj = ne.has('.attach-list');
		if (fj[0]) {
			fj.find('input')[0].value = value[0];
			fj.find('.attach-list').html('附件已添加，保存后显示');
			rr[0] = 1;
			return
		};
		ne = ne.length ? ne : $('label,span:visible', p).FILTER(b).parent().next();
		ne.find('li').length ? setSelectValue(doc, p, b, value, rr) : ne.find('a').length && ne.find('[class*=calendar]').length == 0 ? setDialogValue(doc, p, b, value, rr, tm || 333) : (a = ne.find('input,textarea'), (a.length ? a : ne.prev()).V(value), rr & setTimeout(function (rr) {
				rr[0] = 1
			}, 99, rr))
	};
	_.setSelectValue = function (doc, p, b, value, rr) {
		var v = typeof(value) == 'object' ? value : [value],
		ne = $('label', doc).FILTER(b).next();
		ne = ne.length ? ne : $('label', p).FILTER(b).next();
		ne = ne.length ? ne : $('span', doc).FILTER(b).parent().next();
		if (ne.find('input:visible').val() == value) {
			if (rr) {
				rr[0] = 1
			};
			return
		};
		var d = new DO();
		v.forEach(function (i) {
			d.add(function (r) {
				setTimeout(function () {
					ne.find('li').FILTER(i)[0].click();
					r[0] = 1
				})
			})
		});
		d.add(function (r) {
			r[0] = 1;
			if (rr) {
				rr[0] = 1
			}
		})
	};
	_.setPhoneMoney = function (doc, p, b, month, money, rr) {
		var m = typeof(month) == 'object' ? month : [month],
		v = typeof(money) == 'object' ? money : [money],
		f = 'label:contains(月份):visible',
		mm = m.map(function (i) {
				return i + '月'
			});
		var d = new DO();
		d.add(function (r) {
			setSelectValue(doc, p, b, mm, r);
		});
		m.forEach(function (mm, i) {
			d.add(function (r) {
				r[0] = $(f, p).parent().find('input').FILTER(mm).length > 0
			}, function (r) {
				$(f, p).parent().find('input').FILTER(mm).parent().parent().find('input:last').V(v[i]);
				r[0] = 1;
				if (rr) {
					rr[0] = 1
				};
			})
		})
	};
})(window);
(function (_) {
	debugger;
	var vdm = 'div[id*=_dialog_]:visible';
	_.setDialogValue = function (doc, p, label, value, rr, tm) {
		tm = tm || 333;
		var lod = 'div:contains(正在处理)',
		g = '.datagrid-view .datagrid-row',
		v = value,
		L = $(vdm, p).length,
		md,
		t = $('label', doc).FILTER(label).next();
		t.length && t.find('a')[0].click();
		var ID = setInterval(function () {
				md = $(vdm, p);
				if (md.length > L) {
					debugger;
					clearInterval(ID);
					md = md.TOP();
					flowM();
				}
			}, tm);
		var flowM = function () {
			var d = new DO();
			d.add(function (r) {
				setTimeout(function () {
					var u = md.find('ul.tree'),
					id;
					if (u.length) {
						id = setInterval1(function (id) {
								u.text().trim() != '' && (clearInterval(id), r[0] = 1)
							}, function () {
								r[0] = 1
							}, tm)
					} else {
						r[0] = 1
					}
				}, 33)
			}, function (r) {
				var id = setInterval1(function (id) {
						($(lod, md).length == 0) && ($('.datagrid-view .datagrid-header-row', md)[0]) && (clearInterval(id), setTimeout(function () {
								r[0] = 1
							}, 1))
					}, function () {
						r[0] = 2
					}, tm)
			});
			v.forEach(function (i) {
				d.add(function (r) {
					if ($(g + ':contains(' + i + ')', md)[0]) {
						$(g + ':contains(' + i + ')', md).eq(0).click();
						r[0] = 1
					} else {
						md = $(vdm, p).TOP();
						var a = (t.length ? md.find('input[placeholder]') : filter($('input', p), label)).val(i).next().find('a:first');
						a[0].click();
						var id = setInterval1(function (id) {
								if ($(lod, md).length == 0 && $(g, md).text() != '') {
									clearInterval(id);
									var tr = $(g + ':contains(' + i + ')', md);
									tr.length && tr.eq(0).click();
									r[0] = 1
								}
							}, function () {
								r[0] = 2
							}, tm);
					}
				})
			});
			d.add(function (r) {
				t.length && $(':button', md).FILTER('确 *定').TOP().click();
				var id = setInterval1(function (id) {
						if ($(vdm, p).length == L) {
							clearInterval(id);
							r[0] = 1;
							if (rr) {
								rr[0] = 1
							}
						}
					}, function () {
						r[0] = 2;
						if (rr) {
							rr[0] = 2
						}
					}, 167, {
						timeout: 666
					})
			})
		}
	};
})(window);
(function (_) {
	_.Dvalues = function (e, v1, v2, r) {
		var el = $(e),
		na = el.next().find('input'),
		m = na.attr('name'),
		ar = ['Id', 'Code', 'Name', 'Desc', 'No'],
		n = m.replace(new RegExp(ar.join('|'), 'gm'), ''),
		b = ['afPerson', 'payee', 'person'].map(function (i) {
			return i == n ? 1 : null
		}).join(''),
		i = ar.map(function (i) {
				return 'input[name=' + n + i + ']'
			}).join(','),
		j = el.parent().prev().find(i),
		id = (j[0] ? j : el.parent().find(i)).filter('[name!=' + m + ']'),
		id2 = b ? el.parent().find(i).filter('[name!=' + m + ']').filter('[name!=' + id.attr('name') + ']') : {
			val: function () {}
		};
		id = id[0] ? id : el.prev('input');
		na.val(v1);
		id.add(id2).each(function (i, v) {
			var e = $(v);
			e.val(((b && e.attr('name').slice(-2) == 'Id') ? 'P' : '') + v2)
		});
		r && (r[0] = 1)
	};
})(window)
