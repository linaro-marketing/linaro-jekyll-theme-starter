/*!
 * chartjs-plugin-piechart-outlabels
 * http://chartjs.org/
 * Version: 0.1.4
 *
 * Copyright 2018 Neckster
 * Released under the MIT license
 * https://github.com/Neckster/chartjs-plugin-piechart-outlabels/blob/master/LICENSE
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(require("chart.js"))
    : "function" == typeof define && define.amd
    ? define(["chart.js"], e)
    : e(t.Chart);
})(this, function (t) {
  "use strict";
  function e(t, e) {
    var i = t.outlabels,
      r = {};
    return i === !1 ? null : (i === !0 && (i = {}), s.merge(r, [e, i]));
  }
  t = t && t.hasOwnProperty("default") ? t["default"] : t;
  var i = t.helpers,
    s = i.merge(i, {
      toFontString: function (t) {
        return !t || i.isNullOrUndef(t.size) || i.isNullOrUndef(t.family)
          ? null
          : (t.style ? t.style + " " : "") +
              (t.weight ? t.weight + " " : "") +
              t.size +
              "px " +
              t.family;
      },
      textSize: function (t, e, i) {
        var s,
          r = [].concat(e),
          h = r.length,
          n = t.font,
          o = 0;
        for (t.font = i.string, s = 0; s < h; ++s)
          o = Math.max(t.measureText(r[s]).width, o);
        return (t.font = n), { height: h * i.lineHeight, width: o };
      },
      parseFont: function (e, s) {
        var r = t.defaults.global,
          h = i.valueOrDefault(e.size, r.defaultFontSize);
        e.resizable &&
          (h = this.adaptTextSizeToHeight(s, e.minSize, e.maxSize));
        var n = {
          family: i.valueOrDefault(e.family, r.defaultFontFamily),
          lineHeight: i.options.toLineHeight(e.lineHeight, h),
          size: h,
          style: i.valueOrDefault(e.style, r.defaultFontStyle),
          weight: i.valueOrDefault(e.weight, null),
          string: "",
        };
        return (n.string = i.toFontString(n)), n;
      },
      adaptTextSizeToHeight: function (t, e, i) {
        var s = (t / 100) * 2.5;
        return e && s < e ? e : i && s > i ? i : s;
      },
    }),
    r = {
      LABEL_KEY: "$outlabels",
      backgroundColor: function (t) {
        return t.dataset.backgroundColor;
      },
      borderColor: function (t) {
        return t.dataset.backgroundColor;
      },
      lineColor: function (t) {
        return t.dataset.backgroundColor;
      },
      borderRadius: 0,
      borderWidth: 0,
      lineWidth: 2,
      color: "white",
      display: !0,
      font: {
        family: void 0,
        size: void 0,
        style: void 0,
        weight: null,
        maxSize: null,
        minSize: null,
        resizable: !0,
      },
      lineHeight: 1.2,
      padding: { top: 4, right: 4, bottom: 4, left: 4 },
      textAlign: "center",
      stretch: 40,
      text: "%l %p",
      zoomOutPercentage: 50,
      percentPrecision: 1,
      valuePrecision: 3,
    },
    h = {
      init: function () {
        Math.trunc ||
          (Math.trunc = function (t) {
            return (
              (t = +t),
              t - (t % 1) || (isFinite(t) && 0 !== t ? (t < 0 ? -0 : 0) : t)
            );
          }),
          (Chart.defaults.outlabeledDoughnut = Chart.defaults.doughnut),
          (Chart.defaults.outlabeledPie = Chart.defaults.pie);
        var t = function (t) {
            Chart.controllers.doughnut.prototype.update.call(this);
            var e = this,
              i = e.getMeta(),
              s = e.chart.options.zoomOutPercentage || r.zoomOutPercentage;
            (e.outerRadius *= 1 - s / 100),
              (e.innerRadius *= 1 - s / 100),
              Chart.helpers.each(i.data, function (i, s) {
                e.updateElement(i, s, t);
              });
          },
          e = Chart.controllers.doughnut.extend({ update: t }),
          i = Chart.controllers.pie.extend({ update: t });
        (Chart.controllers.outlabeledPie = i),
          (Chart.controllers.outlabeledDoughnut = e);
      },
    },
    n = {
      center: function (t, e) {
        var i = (t.startAngle + t.endAngle) / 2,
          s = Math.cos(i),
          r = Math.sin(i),
          h = t.outerRadius,
          n = h + e;
        return {
          x: t.x + s * n,
          y: t.y + r * n,
          d: n,
          arc: t,
          anchor: { x: t.x + s * h, y: t.y + r * h },
          copy: { x: t.x + s * n, y: t.y + r * n },
        };
      },
      moveFromAnchor: function (t, e) {
        var i = t.arc,
          s = t.d,
          r = (i.startAngle + i.endAngle) / 2,
          h = Math.cos(r),
          n = Math.sin(r);
        return (
          (s += e),
          {
            x: i.x + h * s,
            y: i.y + n * s,
            d: s,
            arc: i,
            anchor: t.anchor,
            copy: { x: i.x + h * s, y: i.y + n * s },
          }
        );
      },
    },
    o = t.helpers,
    l = r.LABEL_KEY,
    a = {
      OutLabel: function (e, i, s, h, a) {
        var c = t.helpers.options.resolve;
        if (!c([h.display, !0], a, i))
          throw new Error("Label display property is set to false.");
        var d = a.dataset.data[i],
          f = a.labels[i],
          u = c([h.text, r.text], a, i);
        (u = u.replace(/%l/gi, f)),
          (u.match(/%v\.?(\d*)/gi) || [])
            .map(function (t) {
              var e = t.replace(/%v\./gi, "");
              return e.length ? +e : h.valuePrecision || r.valuePrecision;
            })
            .forEach(function (t) {
              u = u.replace(/%v\.?(\d*)/i, d.toFixed(t));
            }),
          (u.match(/%p\.?(\d*)/gi) || [])
            .map(function (t) {
              var e = t.replace(/%p\./gi, "");
              return e.length ? +e : h.percentPrecision || r.percentPrecision;
            })
            .forEach(function (t) {
              u = u.replace(/%p\.?(\d*)/i, (100 * a.percent).toFixed(t) + "%");
            });
        var x = u.match(/[^\r\n]+/g);
        if (!x || !x.length) throw new Error("No text to show.");
        for (var g = 0; g < x.length; ++g) x[g] = x[g].trim();
        (this.init = function (t, n) {
          (this.encodedText = h.text),
            (this.text = t),
            (this.lines = n),
            (this.label = f),
            (this.value = d),
            (this.ctx = s),
            (this.style = {
              backgroundColor: c(
                [h.backgroundColor, r.backgroundColor, "black"],
                a,
                i
              ),
              borderColor: c([h.borderColor, r.borderColor, "black"], a, i),
              borderRadius: c([h.borderRadius, 0], a, i),
              borderWidth: c([h.borderWidth, 0], a, i),
              lineWidth: c([h.lineWidth, 2], a, i),
              lineColor: c([h.lineColor, r.lineColor, "black"], a, i),
              color: c([h.color, "white"], a, i),
              font: o.parseFont(
                c([h.font, { resizable: !0 }]),
                s.canvas.style.height.slice(0, -2)
              ),
              padding: o.options.toPadding(c([h.padding, 0], a, i)),
              textAlign: c([h.textAlign, "left"], a, i),
            }),
            (this.stretch = c([h.stretch, 40], a, i)),
            (this.size = o.textSize(s, this.lines, this.style.font)),
            (this.offsetStep = this.size.width / 20),
            (this.offset = { x: 0, y: 0 }),
            (this.predictedOffset = this.offset);
          var l = -((e._model.startAngle + e._model.endAngle) / 2) / Math.PI,
            u = Math.abs(l - Math.trunc(l));
          u > 0.45 && u < 0.55
            ? (this.predictedOffset.x = 0)
            : l <= 0.45 && l >= -0.45
            ? (this.predictedOffset.x = this.size.width / 2)
            : l >= -1.45 &&
              l <= -0.55 &&
              (this.predictedOffset.x = -this.size.width / 2);
        }),
          this.init(u, x),
          (this.computeLabelRect = function () {
            var t = this.textRect.width + 2 * this.style.borderWidth,
              e = this.textRect.height + 2 * this.style.borderWidth,
              i =
                this.textRect.x -
                this.style.padding.left -
                this.style.borderWidth,
              s =
                this.textRect.y -
                this.style.padding.top -
                this.style.borderWidth;
            return (
              (t += this.style.padding.width),
              (e += this.style.padding.height),
              { x: i, y: s, width: t, height: e }
            );
          }),
          (this.computeTextRect = function () {
            return {
              x: this.center.x - this.size.width / 2,
              y: this.center.y - this.size.height / 2,
              width: this.size.width,
              height: this.size.height,
            };
          }),
          (this.getPoints = function () {
            return [
              { x: this.labelRect.x, y: this.labelRect.y },
              {
                x: this.labelRect.x + this.labelRect.width,
                y: this.labelRect.y,
              },
              {
                x: this.labelRect.x + this.labelRect.width,
                y: this.labelRect.y + this.labelRect.height,
              },
              {
                x: this.labelRect.x,
                y: this.labelRect.y + this.labelRect.height,
              },
            ];
          }),
          (this.containsPoint = function (t, e) {
            return (
              e || (e = 5),
              this.labelRect.x - e <= t.x &&
                t.x <= this.labelRect.x + this.labelRect.width + e &&
                this.labelRect.y - e <= t.y &&
                t.y <= this.labelRect.y + this.labelRect.height + e
            );
          }),
          (this.drawText = function () {
            var t,
              e,
              i,
              s = this.style.textAlign,
              r = this.style.font,
              h = r.lineHeight,
              n = this.style.color,
              o = this.lines.length;
            if (o && n)
              for (
                t = this.textRect.x,
                  e = this.textRect.y + h / 2,
                  "center" === s
                    ? (t += this.textRect.width / 2)
                    : ("end" !== s && "right" !== s) ||
                      (t += this.textRect.width),
                  this.ctx.font = this.style.font.string,
                  this.ctx.fillStyle = n,
                  this.ctx.textAlign = s,
                  this.ctx.textBaseline = "middle",
                  i = 0;
                i < o;
                ++i
              )
                this.ctx.fillText(
                  this.lines[i],
                  Math.round(t),
                  Math.round(e),
                  Math.round(this.textRect.width)
                ),
                  (e += h);
          }),
          (this.drawLabel = function () {
            s.beginPath(),
              o.canvas.roundedRect(
                this.ctx,
                Math.round(this.labelRect.x),
                Math.round(this.labelRect.y),
                Math.round(this.labelRect.width),
                Math.round(this.labelRect.height),
                this.style.borderRadius
              ),
              this.ctx.closePath(),
              this.style.backgroundColor &&
                ((this.ctx.fillStyle = this.style.backgroundColor || "black"),
                this.ctx.fill()),
              this.style.borderColor &&
                this.style.borderWidth &&
                ((this.ctx.strokeStyle = this.style.borderColor),
                (this.ctx.lineWidth = this.style.borderWidth),
                (this.ctx.lineJoin = "miter"),
                this.ctx.stroke());
          }),
          (this.drawLine = function () {
            this.ctx.save(),
              (this.ctx.strokeStyle = this.style.lineColor),
              (this.ctx.lineWidth = this.style.lineWidth),
              (this.ctx.lineJoin = "miter"),
              this.ctx.beginPath(),
              this.ctx.moveTo(this.center.anchor.x, this.center.anchor.y),
              this.ctx.lineTo(this.center.copy.x, this.center.copy.y),
              this.ctx.stroke(),
              this.ctx.restore();
          }),
          (this.draw = function () {
            this.drawLabel(), this.drawText();
          }),
          (this.update = function (t, e, i) {
            (this.center = n.center(t, this.stretch)),
              this.moveLabelToOffset(),
              (this.center.x += this.offset.x),
              (this.center.y += this.offset.y);
            for (var s = !1; !s; ) {
              (this.textRect = this.computeTextRect()),
                (this.labelRect = this.computeLabelRect());
              var r = this.getPoints();
              s = !0;
              for (var h = 0; h < i; ++h) {
                var o = e[h][l];
                if (o)
                  for (var a = o.getPoints(), c = 0; c < r.length; ++c) {
                    if (o.containsPoint(r[c])) {
                      s = !1;
                      break;
                    }
                    if (this.containsPoint(a[c])) {
                      s = !1;
                      break;
                    }
                  }
              }
              s ||
                ((this.center = n.moveFromAnchor(this.center, 1)),
                (this.center.x += this.offset.x),
                (this.center.y += this.offset.y));
            }
          }),
          (this.moveLabelToOffset = function () {
            this.predictedOffset.x <= 0 &&
            this.offset.x > this.predictedOffset.x
              ? ((this.offset.x -= this.offsetStep),
                this.offset.x <= this.predictedOffset.x &&
                  (this.offset.x = this.predictedOffset.x))
              : this.predictedOffset.x >= 0 &&
                this.offset.x < this.predictedOffset.x &&
                ((this.offset.x += this.offsetStep),
                this.offset.x >= this.predictedOffset.x &&
                  (this.offset.x = this.predictedOffset.x));
          });
      },
    };
  h.init(), (t.defaults.global.plugins.outlabels = r);
  var c = r.LABEL_KEY;
  t.plugins.register({
    id: "outlabels",
    resize: function (t, e, i) {
      t.sizeChanged = !0;
    },
    afterDatasetUpdate: function (t, i, s) {
      var r,
        h,
        n,
        o,
        l,
        d,
        f = t.config.data.labels,
        u = t.data.datasets[i.index],
        x = e(u, s),
        g = x && x.display,
        b = i.meta.data || [],
        y = t.ctx;
      for (y.save(), d = 0; d < b.length; ++d) {
        if (
          ((r = b[d]),
          (h = r[c]),
          (n = u.data[d] / i.meta.total),
          (o = null),
          g && r && !r.hidden)
        )
          try {
            (l = {
              chart: t,
              dataIndex: d,
              dataset: u,
              labels: f,
              datasetIndex: i.index,
              percent: n,
            }),
              (o = new a.OutLabel(r, d, y, x, l));
          } catch (p) {
            o = null;
          }
        h &&
          o &&
          !t.sizeChanged &&
          h.label === o.label &&
          h.encodedText === o.encodedText &&
          (o.offset = h.offset),
          (r[c] = o);
      }
      y.restore(), (t.sizeChanged = !1);
    },
    afterDatasetDraw: function (t, e) {
      for (
        var i, s, r, h = e.meta.data || [], n = t.ctx, o = 0;
        o < 2 * h.length;
        ++o
      )
        (r = o < h.length ? o : o - h.length),
          (i = h[r]),
          (s = i[c]),
          s &&
            (o < h.length
              ? (s.update(i._view, h, o), s.drawLine(n))
              : s.draw(n));
    },
  });
});
