# Referenced by
# https://gist.github.com/patrickfav/3f9127e25dd6538f0d682b89cbfaefd9
require "base64"
require "uri"

# Use cases
# {{ email | mailObfuscate: '<i class="fas fa-fw fa-envelope-square" aria-hidden="true"</i>', 'Email' }}
module Jekyll
  module BigDasMailProtection
    def protect_email(input, icon_tag)
      base64Mail = Base64.strict_encode64(URI::encode(input))

      # See http://techblog.tilllate.com/2008/07/20/ten-methods-to-obfuscate-e-mail-addresses-compared/
      output = "<a href=\"mailto:\" "
      output += "data-contact=\"#{base64Mail}\" "
      output += "onclick=\"this.href = 'mailto:' + atob(this.dataset.contact)\">"
      output += "#{icon_tag} "
      output += "<script type=\"text/javascript\">document.write(atob(\"#{base64Mail}\"));</script>"
      output += "</a>"
      return output
    end
  end
end

Liquid::Template.register_filter(Jekyll::BigDasMailProtection)
