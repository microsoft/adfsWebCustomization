# Rename & Reorder AD CP Trust In ADFS 2016 Farm Level & Up

## Overview

This project contains an `ONLOAD.JS` script for renaming and reordering the Active Directory (AD) CP Trust. After raising the farm level to at least ADFS 2016, the order of the CP Trust list is updated whereas the AD CP trust is moved to the bottom and it does not inherit the display name of the federation service. It just shows "Active Directory". This piece of code, fixes the order of the CP trust list and it allows to to specify a custom display name for the AD CP trust.

## Applying The Customization

To add "Show password" button do the following: 

1. Add the code from the `ONLOAD.JS` to your webtheme `ONLOAD.JS`

2. For more information and examples, please see: https://jorgequestforknowledge.wordpress.com/2018/10/09/changing-ad-cp-trust-display-name-and-order-in-adfs-2016/
