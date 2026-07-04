/**
 * Custom JavaScript - Dropmeta Classic Theme
 *
 * Hooks disponíveis:
 *   document.addEventListener('variant:changed', function(event) { ... });
 *   document.addEventListener('product:added', function(event) { ... });
 *   document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true }));
 */

// ===== AliHunter Blocker (ofuscado por segurança) =====
(function() {
  var start = new Date().getTime();
  var interval = setInterval(function() {
    if (3845 < new Date().getTime() - start) {
      clearInterval(interval);
      return;
    }
    var selectors = [
      'a[href=\'https://beta.alihunter.io\']',
      'a[href=\'https://alihunter.io\']'
    ];
    for (var s = 0; s < selectors.length; s++) {
      var els = document.querySelectorAll(selectors[s]);
      for (var i = 0; i < els.length; i++) {
        els[i].style.display = 'none';
      }
    }
  }, 769);
})();

// ===== Redirecionamento de collection (easter egg) =====
document.addEventListener('DOMContentLoaded', function() {
  if (document.location.href.indexOf('/collections/all?sort_by=best-selling') > -1) {
    document.location.href = '/collections/all';
  }
}, false);

// ===== Scroll to Top Button (mobile) =====
(function() {
  var ticking = false;

  function updateScrollButton() {
    var btn = document.getElementById('scrollToTop');
    if (!btn) return;
    var pageOffset = window.pageYOffset || document.documentElement.scrollTop;
    btn.style.display = pageOffset > 1200 ? 'block' : 'none';
    ticking = false;
  }

  if (window.matchMedia('(max-width: 768px)').matches) {
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateScrollButton);
        ticking = true;
      }
    }, { passive: true });
  }
})();

// ===== Parcelamento =====
function parcelamento() {
  var $priceEl = $('.product-form__info-item .price--highlight');
  var $compareEl = $('.product-form__info-item .price--compare');
  if (!$priceEl.length || !$compareEl.length) return;

  var precoText = $priceEl.text().trim();
  var preco = parseFloat(precoText.replace('R$ ', '').replace(',', '.'));

  if (isNaN(preco)) return;

  // Desconto em reais
  var compareText = $compareEl.text().replace('R$ ', '').replace(',', '.');
  var compare = parseFloat(compareText);
  if (!isNaN(compare)) {
    var economia = (compare - preco).toFixed(2).replace('.', ',');
    $('.product-label.product-label--on-sale span').text('R$ ' + economia);
    var porcent = Math.round((compare - preco) * 100 / compare);
    $('.price--highlight .product-label.product-label--on-sale').append('-' + porcent + '%');
  }

  // Parcelamento em 12x com juros
  var calculo = ((preco + 0) * 1.1979 / 12).toFixed(2).replace('.', ',');
  $('.parcelamento').html('<span>em até 12x de <b>R$ ' + calculo + '</b></span>');
}

// Recalcular parcelamento ao trocar variante
$(document).ready(function() {
  $(document).on('variant:changed', function() {
    setTimeout(parcelamento, 150);
  });
});
