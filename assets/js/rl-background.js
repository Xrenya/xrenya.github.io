(function () {
  var canvas = document.querySelector("[data-rl-background]");
  if (!canvas) {
    return;
  }

  var ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var episodeEl = document.querySelector("[data-rl-episode]");
  var rewardEl = document.querySelector("[data-rl-reward]");
  var epsilonEl = document.querySelector("[data-rl-epsilon]");
  var statusEl = document.querySelector("[data-rl-status]");
  var width = 0;
  var height = 0;
  var dpr = 1;
  var lastMetricAt = 0;

  var path = [
    [0.12, 0.78],
    [0.22, 0.72],
    [0.31, 0.58],
    [0.42, 0.61],
    [0.53, 0.45],
    [0.64, 0.38],
    [0.76, 0.28],
    [0.86, 0.2]
  ];

  var neurons = Array.from({ length: 22 }, function (_, index) {
    var layer = index % 4;
    return {
      layer: layer,
      x: 0.58 + layer * 0.105,
      y: 0.2 + ((index * 47) % 100) / 165,
      phase: index * 0.61
    };
  });

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawGrid(time) {
    var cell = Math.max(44, Math.min(82, width / 15));
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.065)";

    for (var x = -cell; x < width + cell; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(time * 0.18) * 8, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (var y = -cell; y < height + cell; y += cell) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + Math.cos(time * 0.16) * 8);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawPolicyPath(time) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(50, 210, 180, 0.56)";
    ctx.shadowColor = "rgba(50, 210, 180, 0.5)";
    ctx.shadowBlur = 16;
    ctx.beginPath();

    path.forEach(function (point, index) {
      var x = point[0] * width;
      var y = point[1] * height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
    ctx.shadowBlur = 0;

    path.forEach(function (point, index) {
      var pulse = 4 + Math.sin(time * 2.2 + index) * 1.8;
      ctx.fillStyle = index === path.length - 1 ? "#f2b84b" : "rgba(255, 255, 255, 0.72)";
      ctx.beginPath();
      ctx.arc(point[0] * width, point[1] * height, pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    var progress = (time * 0.16) % 1;
    var scaled = progress * (path.length - 1);
    var segment = Math.min(path.length - 2, Math.floor(scaled));
    var local = scaled - segment;
    var a = path[segment];
    var b = path[segment + 1];
    var agentX = (a[0] + (b[0] - a[0]) * local) * width;
    var agentY = (a[1] + (b[1] - a[1]) * local) * height;

    ctx.fillStyle = "#f45b69";
    ctx.shadowColor = "rgba(244, 91, 105, 0.8)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(agentX, agentY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawQValues(time) {
    var originX = width * 0.08;
    var originY = height * 0.18;
    var size = Math.min(220, width * 0.24);
    var cells = 5;
    var gap = 4;
    var cell = (size - gap * (cells - 1)) / cells;

    ctx.save();
    for (var row = 0; row < cells; row += 1) {
      for (var col = 0; col < cells; col += 1) {
        var value = 0.2 + Math.abs(Math.sin(time * 0.7 + row * 0.8 + col * 0.45)) * 0.8;
        ctx.fillStyle = "rgba(255, 255, 255, " + (0.035 + value * 0.07).toFixed(3) + ")";
        ctx.fillRect(originX + col * (cell + gap), originY + row * (cell + gap), cell, cell);

        ctx.strokeStyle = value > 0.78 ? "rgba(242, 184, 75, 0.65)" : "rgba(255, 255, 255, 0.08)";
        ctx.strokeRect(originX + col * (cell + gap), originY + row * (cell + gap), cell, cell);

        ctx.fillStyle = value > 0.72 ? "rgba(242, 184, 75, 0.86)" : "rgba(255, 255, 255, 0.28)";
        ctx.beginPath();
        ctx.moveTo(originX + col * (cell + gap) + cell * 0.5, originY + row * (cell + gap) + cell * 0.25);
        ctx.lineTo(originX + col * (cell + gap) + cell * 0.72, originY + row * (cell + gap) + cell * 0.58);
        ctx.lineTo(originX + col * (cell + gap) + cell * 0.28, originY + row * (cell + gap) + cell * 0.58);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawNetwork(time) {
    ctx.save();
    neurons.forEach(function (from) {
      neurons.forEach(function (to) {
        if (to.layer !== from.layer + 1) {
          return;
        }
        var strength = 0.12 + Math.abs(Math.sin(time + from.phase + to.phase)) * 0.18;
        ctx.strokeStyle = "rgba(90, 160, 255, " + strength.toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x * width, from.y * height);
        ctx.lineTo(to.x * width, to.y * height);
        ctx.stroke();
      });
    });

    neurons.forEach(function (node) {
      var activity = 0.5 + Math.sin(time * 1.7 + node.phase) * 0.5;
      ctx.fillStyle = activity > 0.72 ? "#32d2b4" : "rgba(255, 255, 255, 0.68)";
      ctx.beginPath();
      ctx.arc(node.x * width, node.y * height, 2.8 + activity * 2.6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawRewardBars(time) {
    var baseX = width * 0.58;
    var baseY = height * 0.84;
    var bars = 24;
    var barWidth = Math.max(4, width * 0.012);

    ctx.save();
    for (var i = 0; i < bars; i += 1) {
      var value = 0.35 + Math.abs(Math.sin(time * 0.9 + i * 0.38)) * 0.65;
      var barHeight = value * height * 0.16;
      ctx.fillStyle = i % 3 === 0 ? "rgba(244, 91, 105, 0.58)" : "rgba(242, 184, 75, 0.48)";
      ctx.fillRect(baseX + i * (barWidth + 5), baseY - barHeight, barWidth, barHeight);
    }
    ctx.restore();
  }

  function updateMetrics(timestamp) {
    if (timestamp - lastMetricAt < 500) {
      return;
    }
    lastMetricAt = timestamp;

    var time = timestamp * 0.001;
    if (episodeEl) {
      episodeEl.textContent = ("0000" + (248 + Math.floor(time * 1.6))).slice(-4);
    }
    if (rewardEl) {
      rewardEl.textContent = "+" + (71 + Math.sin(time * 0.7) * 8 + Math.min(time * 0.03, 9)).toFixed(1);
    }
    if (epsilonEl) {
      epsilonEl.textContent = Math.max(0.03, 0.22 - (time % 30) * 0.004).toFixed(2);
    }
    if (statusEl) {
      statusEl.textContent = Math.sin(time * 0.8) > -0.15 ? "optimizing" : "exploring";
    }
  }

  function draw(timestamp) {
    var time = timestamp * 0.001;
    ctx.clearRect(0, 0, width, height);
    drawGrid(time);
    drawQValues(time);
    drawPolicyPath(time);
    drawNetwork(time);
    drawRewardBars(time);
    updateMetrics(timestamp);

    if (!prefersReducedMotion) {
      window.requestAnimationFrame(draw);
    }
  }

  resize();
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(draw);
})();
