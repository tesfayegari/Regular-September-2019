# SharePoint REST API END POINT

SharePoint REST API endpoint starts with pattern of https://yoursite/_api/web

## Example 
- Root Web Information
 YourSiteUrl/_api/web

- All Lists Information
YourSiteUrl/_api/web/lists

- Select Specific Properties Ex Title and ItemCount of every list
YourSiteUrl/_api/web/lists?$select=Title,ITemCount,Hidden

- Filter Based on Properties Ex Dont bring hidden lists
YourSiteUrl/_api/web/lists?$select=Title,ITemCount,Hidden&$filter=Hidden eq false

- Get Specific List By Name Ex Expenses List
YourSiteUrl/_api/web/lists/getbytitle('Expenses')

- SharePoint Items 
YourSiteUrl/_api/web/lists/getbytitle('Expenses')/items?$select=Title

-Top N items Ex top 12 items
YourSiteUrl/_api/web/lists/getbytitle('Expenses')/items?$top=12 
