#!/bin/bash

# SheetLink Domain Verification Script
# Checks DNS propagation and domain status

echo "🔍 SheetLink Domain Verification"
echo "================================="
echo ""

# Check DNS propagation
echo "📡 Checking DNS propagation..."
echo ""

echo "Root domain (sheetlink.app):"
dig +short sheetlink.app A
if [ $? -eq 0 ]; then
  dns_root=$(dig +short sheetlink.app A)
  if [ "$dns_root" == "76.76.21.21" ]; then
    echo "✅ Root domain DNS configured correctly"
  elif [ -z "$dns_root" ]; then
    echo "⏳ Root domain DNS not propagated yet"
  else
    echo "⚠️  Root domain points to: $dns_root (expected: 76.76.21.21)"
  fi
else
  echo "❌ DNS lookup failed for sheetlink.app"
fi

echo ""
echo "WWW subdomain (www.sheetlink.app):"
dns_www=$(dig +short www.sheetlink.app A)
if [ "$dns_www" == "76.76.21.21" ]; then
  echo "✅ WWW subdomain DNS configured correctly"
elif [ -z "$dns_www" ]; then
  echo "⏳ WWW subdomain DNS not propagated yet"
else
  echo "⚠️  WWW subdomain points to: $dns_www (expected: 76.76.21.21)"
fi

echo ""
echo "================================="
echo ""

# Check Vercel domain status
echo "🔧 Checking Vercel domain status..."
echo ""
vercel domains ls 2>/dev/null | grep -E "sheetlink.app|Status"

echo ""
echo "================================="
echo ""

# Try HTTP/HTTPS requests
echo "🌐 Checking HTTP connectivity..."
echo ""

echo "Testing https://sheetlink.app:"
http_status=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 https://sheetlink.app 2>/dev/null)
if [ "$http_status" == "200" ]; then
  echo "✅ Site is live! (HTTP $http_status)"
elif [ "$http_status" == "000" ]; then
  echo "⏳ Site not reachable yet (connection timeout)"
else
  echo "⚠️  HTTP Status: $http_status"
fi

echo ""
echo "Testing https://www.sheetlink.app:"
http_status_www=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 https://www.sheetlink.app 2>/dev/null)
if [ "$http_status_www" == "200" ]; then
  echo "✅ WWW site is live! (HTTP $http_status_www)"
elif [ "$http_status_www" == "000" ]; then
  echo "⏳ WWW site not reachable yet (connection timeout)"
else
  echo "⚠️  HTTP Status: $http_status_www"
fi

echo ""
echo "================================="
echo ""

# Summary
if [ "$dns_root" == "76.76.21.21" ] && [ "$dns_www" == "76.76.21.21" ] && [ "$http_status" == "200" ]; then
  echo "🎉 SUCCESS! Your site is fully live at https://sheetlink.app"
  echo ""
  echo "Next steps:"
  echo "  • Update Chrome extension manifest with https://sheetlink.app"
  echo "  • Set up Google Analytics/Plausible if needed"
  echo "  • Add environment variables in Vercel dashboard"
else
  echo "⏳ Domain configuration in progress..."
  echo ""
  echo "DNS propagation can take 5-30 minutes (sometimes up to 48 hours)."
  echo "Run this script again in a few minutes to check status."
  echo ""
  echo "To monitor in real-time, run:"
  echo "  watch -n 10 ./check-domain.sh"
fi

echo ""
